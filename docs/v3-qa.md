# V3 design and engineering QA

Reviewed 21 October 2026. This record separates checks performed from remaining launch work.

## Content preservation

`scripts/verify-content.py` checks the original 207 normalized text nodes as an ordered subsequence. It also compares the original scenario/module data blocks against the baseline. Both pass. New material is limited to delivery outputs, workflow/data/review principles, brief helper copy and JavaScript-free guidance. Product maturity, contact details and existing claims are preserved.

## Browser review

Supported Chrome preview was used for desktop visuals and functional interactions. A temporary same-origin iframe harness rendered the page at 320px, 375px, 768px and 1363px widths. At 320/375/768, measured document scroll width did not exceed the frame's layout width. This is responsive browser rendering, not a test on physical mobile devices.

Checked:

- Hero, floating navigation, capability composition and ManuQube module surface.
- Mobile menu opening, mobile project-brief opening, close and return of focus to the menu button.
- Inventory scenario selection and handoff disclosure at the smallest width.
- Recipe module selection and keyboard End navigation to QMS.
- Motion pause changes its pressed state and label; optional visual effects stop.
- Active-section navigation and context-dependent action dock.
- Prepared project brief preserves test text and correctly URL-encodes the WhatsApp draft; no message was sent.
- JavaScript-disabled fallback keeps navigation and page content visible; direct contact is available. Interactive switching is explicitly identified as requiring JavaScript.

No application-origin error was observed in the retrieved browser console entries; an extension metadata error was excluded from application findings.

## Accessibility checks

Axe-core was run in the rendered Chrome preview against WCAG 2 A/AA, 2.1 AA and 2.2 AA tagged rules. The first 375px audit identified two low-contrast section-number badges. Their opacity was corrected. Subsequent 375px and 1363px scans detected zero automatic violations (28 passing rule groups). The open desktop project-dialog scan detected zero automatic violations (31 passing rule groups).

Axe marked some contrast checks incomplete because of layered backgrounds/artwork; these results are not a complete accessibility conformance statement. Main text and controls were visually reviewed. A full assistive-technology review, device/browser matrix and independent accessibility audit remain outside this pass.

OS reduced-motion changes, forced-colors mode, low-power behavior and offscreen animation cleanup were reviewed in source; those environment settings were not emulated through the available browser controls. No claimed FPS benchmark, Lighthouse score, Core Web Vitals field result or conversion uplift.

## Source / deployment checks

- Local HTML paths, IDs and ARIA references, JavaScript syntax and CSS asset paths validated.
- The animation module is bundled locally; package versions and lockfile are committed.
- CI rebuilds the module and checks that committed output matches; source preservation and HTTP smoke checks include the new assets.
- The Docker image continues to copy static `public/` files only and requires no runtime Node process.
- Temporary browser audit/harness files are excluded from both the repository and published Site.

The GitHub Actions result is the authoritative container-build and HTTP validation result for the final commit. Domain/DNS cutover, HTTPS configuration on a separate host, physical-device QA and a final commercial-content signoff remain launch responsibilities. This work updates the existing private review Site and GitHub source; it does not change the company's existing domain.
