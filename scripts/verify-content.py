#!/usr/bin/env python3
"""Ensure V3 enriches rather than deletes/rewrites the approved V2 text/data."""
from html.parser import HTMLParser
from pathlib import Path
import hashlib,json
ROOT=Path(__file__).resolve().parents[1]
class Content(HTMLParser):
    def __init__(self):
        super().__init__(); self.skip=0; self.text=[]
    def handle_starttag(self,t,a):
        if t in ('script','style','svg'): self.skip+=1
    def handle_endtag(self,t):
        if t in ('script','style','svg'): self.skip-=1
    def handle_data(self,d):
        d=' '.join(d.split())
        if not self.skip and d: self.text.append(d)
baseline=json.loads((ROOT/'docs/baselines/v2-content.json').read_text())
current=Content(); current.feed((ROOT/'public/index.html').read_text())
iterator=iter(current.text)
for expected in baseline['text_nodes']:
    assert any(actual==expected for actual in iterator), f'Original copy removed or rewritten: {expected}'
app=(ROOT/'public/app.js').read_text()
blocks=[app.split('const cases = ',1)[1].split('  const scenarioTabs',1)[0],app.split('const modules=',1)[1].split('  const moduleTabs',1)[0]]
assert hashlib.sha256(('\n'.join(blocks)).encode()).hexdigest()==baseline['operational_data_sha256'],'Operational scenario/module data changed'
print(f"PASS: all {len(baseline['text_nodes'])} original text nodes retained in order; all scenario/module data unchanged")
