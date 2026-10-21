#!/usr/bin/env python3
"""Smoke-test a running container through its published HTTP port."""
from urllib.request import urlopen
from urllib.error import HTTPError
import sys

base = (sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:8080').rstrip('/')
checks = {
    '/': b'Your operation.',
    '/healthz': b'ok',
    '/research.html': b'25-company',
    '/styles.css': b'--ink',
    '/app.js': b'chooseScenario',
    '/assets/CortaNexAI_horizontal_white.svg': b'<svg',
    '/assets/connected-flow-hero.webp': b'RIFF',
    '/assets/Inter-Regular.woff2': b'wOF2',
}
for path, marker in checks.items():
    with urlopen(base + path, timeout=10) as response:
        body = response.read()
        assert response.status == 200 and marker in body, path
        assert response.headers.get('X-Content-Type-Options') == 'nosniff', path
        assert response.headers.get('X-Frame-Options') == 'SAMEORIGIN', path
        print('PASS', path, response.headers.get('Content-Type'))
try:
    urlopen(base + '/missing-page-qa', timeout=10)
except HTTPError as error:
    assert error.code == 404, error.code
    print('PASS unknown route returns 404')
else:
    raise AssertionError('Unknown route incorrectly returned success')
