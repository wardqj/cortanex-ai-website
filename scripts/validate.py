#!/usr/bin/env python3
"""Validate local documents/assets and required deployment inputs; no packages."""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'

class Document(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.refs, self.urls = [], [], []
        self.h1 = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        self.h1 += tag == 'h1'
        for key in ('aria-controls', 'aria-labelledby', 'aria-describedby', 'for'):
            self.refs.extend(attrs.get(key, '').split())
        for key in ('src', 'href'):
            if attrs.get(key):
                self.urls.append(attrs[key])

def validate_url(value, origin):
    parsed = urlsplit(value)
    if parsed.scheme or parsed.netloc:
        return
    target = PUBLIC / unquote(parsed.path).lstrip('/') if parsed.path.startswith('/') else origin.parent / unquote(parsed.path)
    if not parsed.path:
        target = origin
    if parsed.path:
        assert target.exists(), f'Missing local path: {value} in {origin.name}'
    if parsed.fragment and target.suffix == '.html':
        linked = Document()
        linked.feed(target.read_text())
        assert unquote(parsed.fragment) in linked.ids, f'Missing anchor: {value}'

for page in sorted(PUBLIC.glob('*.html')):
    doc = Document()
    doc.feed(page.read_text())
    assert doc.h1 == 1, f'{page.name}: expected one H1'
    assert not [i for i, n in Counter(doc.ids).items() if n > 1], f'{page.name}: duplicate IDs'
    assert set(doc.refs) <= set(doc.ids), f'{page.name}: invalid ARIA/label reference'
    for url in doc.urls:
        validate_url(url, page)
    print(f'PASS {page.name}: {len(doc.ids)} unique IDs, local links/assets valid')

for css in PUBLIC.glob('*.css'):
    for url in re.findall(r'url\([\"\']?([^\)\"\']+)', css.read_text()):
        validate_url(url, css)
    print(f'PASS {css.name}: local CSS asset references valid')

for name in ('Dockerfile', 'compose.yaml', 'docker/nginx.conf', '.env.example'):
    assert (ROOT / name).is_file(), f'Missing deployment input: {name}'
print('PASS deployment inputs present')
