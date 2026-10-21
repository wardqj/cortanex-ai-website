import { animate } from 'motion/mini';

// Optional visual enhancement: core content and app controls never depend on it.
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const activeAnimations = new Set();
let paused = reduced.matches;
const hero = $('.hero-experience');
const toggle = $('#motion-toggle');
const canvas = $('#flow-canvas');
const ctx = canvas?.getContext('2d');
let heroVisible = true, canvasFrame = 0, width = 0, height = 0, lastFrame = 0;
let pointerX = 0, pointerY = 0, pointerFrame = 0;

function motion(el, frames, options = {}) {
  if (paused || !el || !el.animate) return;
  const control = animate(el, frames, {duration:.55, ease:[.22,1,.36,1], ...options});
  activeAnimations.add(control);
  control.finished.then(() => activeAnimations.delete(control)).catch(() => activeAnimations.delete(control));
}
function updateToggle() {
  toggle.hidden = false;
  toggle.disabled = reduced.matches;
  toggle.setAttribute('aria-pressed', String(paused));
  toggle.querySelector('span').textContent = reduced.matches ? 'Reduced motion' : paused ? 'Resume effects' : 'Pause effects';
  document.documentElement.classList.toggle('effects-paused',paused);
}
function stopAnimations() {
  activeAnimations.forEach(control => control.complete());
  activeAnimations.clear();
  cancelAnimationFrame(canvasFrame); canvasFrame = 0;
  cancelAnimationFrame(pointerFrame); pointerFrame = 0;
  hero.style.removeProperty('--art-x'); hero.style.removeProperty('--art-y');
}
function cubic(a,b,c,d,t) {const u=1-t;return u*u*u*a+3*u*u*t*b+3*u*t*t*c+t*t*t*d;}
function draw(time=0) {
  if(!ctx || !width || !height)return;
  ctx.clearRect(0,0,width,height);
  const compact = width < 720;
  const x0=width*(compact?.38:.52), y0=height*.15;
  for(let i=0;i<5;i++) {
    const startX=x0+i*width*.045, startY=y0-i*13;
    const endX=width*(.72+i*.08),endY=height*1.1;
    const c1x=width*.28,c1y=height*.46,c2x=width*1.18,c2y=height*.44;
    ctx.beginPath();ctx.moveTo(startX,startY);ctx.bezierCurveTo(c1x,c1y,c2x,c2y,endX,endY);
    ctx.strokeStyle='rgba(137,197,255,0.12)';ctx.lineWidth=1;ctx.stroke();
    for(let j=0;j<2;j++) {
      const t=((time/13000+j*.5+i*.12)%1);
      const x=cubic(startX,c1x,c2x,endX,t),y=cubic(startY,c1y,c2y,endY,t);
      const glow=ctx.createRadialGradient(x,y,0,x,y,10);
      glow.addColorStop(0,'rgba(173,220,255,.8)');glow.addColorStop(.25,'rgba(56,157,255,.25)');glow.addColorStop(1,'rgba(56,157,255,0)');
      ctx.fillStyle=glow;ctx.beginPath();ctx.arc(x,y,10,0,Math.PI*2);ctx.fill();
    }
  }
}
function tick(time) {
  canvasFrame=0;
  if(paused || !heroVisible || document.hidden)return;
  if(time-lastFrame>33){draw(time);lastFrame=time;}
  canvasFrame=requestAnimationFrame(tick);
}
function startCanvas(){if(ctx && !canvasFrame && !paused && heroVisible && !document.hidden)canvasFrame=requestAnimationFrame(tick);}
function resizeCanvas(){if(!ctx)return;const r=hero.getBoundingClientRect();width=r.width;height=r.height;const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw();}
if(ctx){resizeCanvas();if('ResizeObserver' in window)new ResizeObserver(resizeCanvas).observe(hero);else addEventListener('resize',resizeCanvas,{passive:true});}

toggle.addEventListener('click',()=>{if(reduced.matches)return;paused=!paused;updateToggle();if(paused)stopAnimations();else startCanvas();});
reduced.addEventListener('change',()=>{paused=reduced.matches;updateToggle();if(paused)stopAnimations();else startCanvas();});
updateToggle();

if('IntersectionObserver' in window){
  const heroObserver=new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;if(heroVisible)startCanvas();else{cancelAnimationFrame(canvasFrame);canvasFrame=0;}},{threshold:0});
  heroObserver.observe(hero);
  const reveals=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){motion(entry.target,{opacity:[0,1],transform:['translateY(22px)','translateY(0px)']});reveals.unobserve(entry.target);}}),{threshold:.12,rootMargin:'0px 0px -20px 0px'});
  $$('.section-header,.scenario-workspace,.expertise-tile,.product-intro,.product-platform,.delivery-step,.about-layout,.principle,.contact-inner').forEach(el=>reveals.observe(el));
  const anchors=$$('.desktop-nav a');
  const navObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){anchors.forEach(a=>{if(a.hash==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}}),{rootMargin:'-20% 0px -50% 0px'});
  ['experience','expertise','manuqube','about'].forEach(id=>navObserver.observe(document.getElementById(id)));
  const dock=$('.action-dock');let heroActionVisible=true,contactActionVisible=false;
  const updateDock=()=>{const hidden=heroActionVisible||contactActionVisible;dock.classList.toggle('is-resting',hidden);dock.inert=hidden;dock.setAttribute('aria-hidden',String(hidden));};
  new IntersectionObserver(entries=>{heroActionVisible=entries[0].isIntersecting;updateDock();},{threshold:0}).observe($('.hero-actions'));
  new IntersectionObserver(entries=>{contactActionVisible=entries[0].isIntersecting;updateDock();},{threshold:0}).observe($('.contact-actions'));
}

hero.addEventListener('pointermove',event=>{
  if(paused||!finePointer.matches||!heroVisible)return;
  const r=hero.getBoundingClientRect();pointerX=((event.clientX-r.left)/r.width-.5)*12;pointerY=((event.clientY-r.top)/r.height-.5)*10;
  if(!pointerFrame)pointerFrame=requestAnimationFrame(()=>{hero.style.setProperty('--art-x',pointerX+'px');hero.style.setProperty('--art-y',pointerY+'px');pointerFrame=0;});
},{passive:true});
hero.addEventListener('pointerleave',()=>{hero.style.setProperty('--art-x','0px');hero.style.setProperty('--art-y','0px');},{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(canvasFrame);canvasFrame=0;}else startCanvas();});

const progress=$('.reading-progress');let scrollFrame=0;
function updateProgress(){scrollFrame=0;const range=document.documentElement.scrollHeight-innerHeight;progress.style.transform='scaleX('+(range>0?Math.min(1,scrollY/range):0)+')';$('.site-header').classList.toggle('is-scrolled',scrollY>24);}
addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(updateProgress);},{passive:true});updateProgress();

// Animate changes, not synthetic product activity. Text is updated by app.js first.
$$('[data-scenario]').forEach(button=>button.addEventListener('click',()=>motion($('#scenario-records'),{opacity:[.45,1],transform:['translateY(7px)','translateY(0)']},{duration:.3})));
$$('[data-module]').forEach(button=>button.addEventListener('click',()=>motion($('#module-detail'),{opacity:[.4,1],transform:['translateY(7px)','translateY(0)']},{duration:.32})));
$('#reveal-scenario').addEventListener('click',()=>{if(!$('#scenario-insight').hidden){motion($('#scenario-insight'),{opacity:[0,1],transform:['translateY(10px)','translateY(0)']},{duration:.4});motion($('.connection-line'),{opacity:[.3,1]},{duration:.4});}});
$('#project-dialog').addEventListener('close',()=>{document.body.classList.remove('brief-is-open');});
$$('[data-open-project]').forEach(link=>link.addEventListener('click',()=>{if($('#project-dialog').open){document.body.classList.add('brief-is-open');motion($('#project-dialog'),{opacity:[0,1],transform:['translateY(12px) scale(.985)','translateY(0) scale(1)']},{duration:.24});}}));
motion($('.hero-title'),{opacity:[0,1],transform:['translateY(18px)','translateY(0)']},{duration:.7});
startCanvas();
