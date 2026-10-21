(() => {
  'use strict';
  const q = selector => document.querySelector(selector);
  const all = selector => [...document.querySelectorAll(selector)];
  const cases = {
    manufacturing: {
      interest:'Manufacturing', question:'Why is this work order waiting?', context:'Production, recipe and quality records viewed together.',
      heading:'Find the next decision.', explanation:'A waiting order is a starting point. The related records show where responsibility sits.',
      records:[['Production / EX-1042','Work order','Awaiting quality review before the next step.','Waiting for review'],['Quality / QC-018','Inspection record','The inspection needs an authorized disposition.','Review pending'],['Recipe / R-03','Released instruction','Recipe version 3 is referenced by this order.','Released version']],
      finding:'The recipe is released, but quality review is still pending. The next step is to review the inspection record and record an authorized disposition.', owner:'Quality owner'
    },
    inventory: {
      interest:'Inventory', question:'Can this lot be allocated?', context:'The stock request, material status and disposition record viewed together.',
      heading:'Availability is only part of the answer.', explanation:'A quantity in stock does not explain whether that material is ready for allocation.',
      records:[['Request / EX-210','Material request','The next operation requires a material allocation.','Allocation requested'],['Inventory / LOT-07','Material lot','The requested lot is currently in quarantine.','Quarantined'],['Quality / DSP-07','Disposition record','The lot is awaiting an authorized review.','Disposition pending']],
      finding:'The lot exists in inventory, but its quarantine status is still unresolved. The next handoff is an authorized quality disposition before allocation proceeds.', owner:'Quality owner + inventory team'
    },
    customer: {
      interest:'Customer operations', question:'Who owns the next step?', context:'The quote, conversation and follow-up record viewed together.',
      heading:'Make the handoff explicit.', explanation:'The next action needs an owner as well as a place in the customer record.',
      records:[['Quote / EX-Q14','Customer quote','The quote is awaiting a customer response.','Response pending'],['Activity / EX-A14','Follow-up task','The next follow-up has not been assigned.','Owner needed'],['Customer / EX-C14','Conversation record','The latest discussion is linked to the quote.','Context available']],
      finding:'The customer context is available, but the follow-up has no owner. The next step is to assign responsibility and agree when the follow-up should happen.', owner:'Sales team lead'
    }
  };
  const scenarioTabs = all('[data-scenario]');
  function chooseScenario(button, focus = false) {
    const item = cases[button.dataset.scenario];
    scenarioTabs.forEach(b => { const active=b===button; b.classList.toggle('is-active',active); b.setAttribute('aria-selected',String(active)); b.tabIndex=active?0:-1; });
    q('#scenario-workspace').setAttribute('aria-labelledby',button.id);
    q('#scenario-question').textContent=item.question; q('#scenario-context').textContent=item.context;
    q('#scenario-heading').textContent=item.heading; q('#scenario-explanation').textContent=item.explanation;
    q('#insight-text').textContent=item.finding; q('#insight-owner').textContent=item.owner;
    q('#scenario-insight [data-open-project]').dataset.interest=item.interest;
    q('#scenario-records').replaceChildren(...item.records.map(row => {
      const card=document.createElement('article'); card.className='record-card';
      const label=document.createElement('span'); label.className='record-label'; label.textContent=row[0];
      const title=document.createElement('h3'); title.className='record-title'; title.textContent=row[1];
      const body=document.createElement('p'); body.className='record-body'; body.textContent=row[2];
      const state=document.createElement('span'); state.className='record-state'; state.textContent=row[3];
      card.append(label,title,body,state); return card;
    }));
    q('#scenario-insight').hidden=true; q('#reveal-scenario').setAttribute('aria-expanded','false');
    if(focus)button.focus();
  }
  function setupTabs(buttons, select) {
    buttons.forEach((button,index) => {
      button.addEventListener('click',()=>select(button));
      button.addEventListener('keydown',event=>{
        let next;
        if(event.key==='ArrowRight')next=(index+1)%buttons.length;
        if(event.key==='ArrowLeft')next=(index-1+buttons.length)%buttons.length;
        if(event.key==='Home')next=0;
        if(event.key==='End')next=buttons.length-1;
        if(next!==undefined){event.preventDefault();select(buttons[next],true);}
      });
    });
  }
  setupTabs(scenarioTabs,chooseScenario);
  all('[data-scenario-link]').forEach(link=>link.addEventListener('click',()=>chooseScenario(q('[data-scenario="'+link.dataset.scenarioLink+'"]'))));
  q('#reveal-scenario').addEventListener('click',()=>{
    const panel=q('#scenario-insight'); panel.hidden=!panel.hidden;
    q('#reveal-scenario').setAttribute('aria-expanded',String(!panel.hidden));
  });

  const modules={
    mes:{code:'MES / Production',title:'Manufacturing Execution System',description:'Execution, materials, work in progress and downtime in the context of production work.',scope:['Production execution','Materials & work in progress','Downtime records'],chain:[['Work definition','Work order'],['Work performed','Production activity'],['Review context','Execution record']]},
    oms:{code:'OMS / Orders',title:'Order Management System',description:'A defined path for order work through sourcing, allocation and fulfillment.',scope:['Order records','Sourcing & allocation','Fulfillment workflows'],chain:[['The request','Order requirements'],['Coordination','Sourcing & allocation'],['The next step','Fulfillment record']]},
    rms:{code:'RMS / Recipes',title:'Recipe Management System',description:'Recipe definitions and versions managed through review and release controls.',scope:['Recipe definitions','Version control','Review & release'],chain:[['The definition','Recipe version'],['The review','Approval workflow'],['The release','Released recipe']]},
    qms:{code:'QMS / Quality',title:'Quality Management System',description:'Inspection and exception work connected to records, review steps and corrective actions.',scope:['Inspection workflows','Nonconformance records','Corrective actions'],chain:[['The check','Inspection record'],['The exception','Nonconformance'],['The response','Corrective action']]}
  };
  const moduleTabs=all('[data-module]');
  function chooseModule(button,focus=false){
    const item=modules[button.dataset.module];
    moduleTabs.forEach(b=>{const active=b===button;b.classList.toggle('is-active',active);b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});
    q('#module-detail').setAttribute('aria-labelledby',button.id);
    q('#module-code').textContent=item.code;q('#module-title').textContent=item.title;q('#module-description').textContent=item.description;
    q('#module-scope').replaceChildren(...item.scope.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
    q('#record-chain').replaceChildren(...item.chain.map(row=>{const d=document.createElement('div');const s=document.createElement('small');s.textContent=row[0];const b=document.createElement('strong');b.textContent=row[1];d.append(s,b);return d;}));
    if(focus)button.focus();
  }
  setupTabs(moduleTabs,chooseModule);

  const menu=q('.menu-toggle'),mobileNav=q('#mobile-nav');
  function closeMenu(focus=false){mobileNav.hidden=true;menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');if(focus)menu.focus();}
  menu.addEventListener('click',()=>{const opening=mobileNav.hidden;mobileNav.hidden=!opening;menu.setAttribute('aria-expanded',String(opening));menu.setAttribute('aria-label',opening?'Close menu':'Open menu');});
  mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>closeMenu()));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileNav.hidden)closeMenu(true);});
  window.matchMedia('(min-width: 960px)').addEventListener('change',event=>{if(event.matches)closeMenu();});

  const dialog=q('#project-dialog'),briefForm=q('#brief-form'),review=q('#brief-review');
  let lastTrigger=null,productInterest='';
  function selectOperation(value){const input=all('input[name="operation"]').find(i=>i.value===value);if(input)input.checked=true;}
  all('[data-open-project]').forEach(link=>link.addEventListener('click',event=>{
    if(typeof dialog.showModal!=='function')return;
    event.preventDefault();lastTrigger=link;productInterest=link.dataset.product||'';
    if(link.dataset.interest)selectOperation(link.dataset.interest);
    briefForm.hidden=false;review.hidden=true;closeMenu();dialog.showModal();
  }));
  q('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{if(lastTrigger)(mobileNav.contains(lastTrigger)&&mobileNav.hidden?menu:lastTrigger).focus();});
  dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
  briefForm.addEventListener('submit',event=>{
    event.preventDefault();
    const operation=q('input[name="operation"]:checked').value;
    const challenge=q('#brief-challenge').value.trim(),tools=q('#brief-tools').value.trim();
    if(!challenge){q('#brief-challenge').focus();return;}
    const message='Hello CortaNex AI team,\n\nI would like to discuss '+(productInterest?'a ManuQube pilot':'an operational software project')+' with CortaNex AI.\n\nOperation: '+operation+'\n\nWhat needs to work better:\n'+challenge+(tools?'\n\nCurrent tools: '+tools:'');
    q('#brief-preview').textContent=message;
    q('#send-brief').href='https://wa.me/962798716666?text='+encodeURIComponent(message);
    q('#email-brief').href='mailto:info@cortanexai.com?subject='+encodeURIComponent(productInterest?'ManuQube pilot enquiry':'Business enquiry | CortaNex AI')+'&body='+encodeURIComponent(message);
    briefForm.hidden=true;review.hidden=false;q('#email-brief').focus();
  });
  q('#edit-brief').addEventListener('click',()=>{review.hidden=true;briefForm.hidden=false;q('#brief-challenge').focus();});
  q('#brief-form button[type="submit"]').disabled=false;
})();
