# CortaNex AI landing page — V2 QA record

Reviewed 21 October 2026. This record distinguishes actual browser checks from source review.

## Desktop browser checks

Supported managed preview opened in Chrome at a reported viewport of 1363 × 936. Visually reviewed the hero/header, workflow explorer, ManuQube module panel, brief form, brief review and FAQ. Page scroll width did not exceed viewport width. Local hero artwork and official logo rendered correctly.

Verified through browser interaction:

- Manufacturing, inventory and customer scenario tabs change the operational question, record cards and ARIA selection. Revealing the inventory handoff exposes the appropriate decision owner. Switching scenarios resets the reveal.
- QMS selection displays the full module name, scope and record workflow. ArrowRight from QMS wraps to MES and moves keyboard focus.
- Primary navigation CTA opens the native project-brief dialog. Required challenge and optional tools accept input. Preparing the brief shows a review with the entered text. Editing returns to the form and closing returns to the page.
- The generated WhatsApp URL uses +962 79 871 6666 and correctly encodes spaces, newlines and the ampersand in test input. No WhatsApp message was sent and no external messaging flow was opened.
- The AI FAQ disclosure opens with its agreed task/review/boundary explanation.
- Browser console observations contained extension-origin metadata errors; no application-origin error was observed in the retrieved entries. This is not a complete error-monitoring or network audit.

## Source and structural checks

JavaScript syntax, HTML IDs, internal references and local asset paths checked. Native form validation, labelled fields, tab keyboard handlers, visible focus rules, reduced-motion styles and no-JavaScript contact fallbacks reviewed. The menu boundary matches CSS at 960px. Mobile-origin dialog close restores focus to the menu button when its opener is hidden. Below 400px the secondary dock action is hidden to preserve the primary action's space; ManuQube remains accessible through navigation and page content.

Responsive layouts are defined in CSS. A supported viewport-resize control was not available, so actual phone/tablet rendering, touch interaction and mobile menu behavior were not browser-tested. No screen-reader, Lighthouse, accessibility certification, cross-browser or live WhatsApp-delivery claim is made.

## Content checks

- Company services and prior client delivery are distinguished from ManuQube's product direction.
- MES, OMS, RMS and QMS are initial releases. Tested handoffs, hardening and factory validation remain the next stage.
- Warehouse and maintenance are roadmap scope.
- Explorer records are explicitly illustrative, not live product screens or customer outcomes.
- No invented metrics, testimonials, customer identities, certifications, partnerships or deployment claims.
- Project brief is reviewed before opening a draft; no fake successful delivery state.

## Research boundary

The comparison covers 25 selected companies with official YC profiles and primary company pages. It is a curated sample, not an audit of every YC company. Reference observations come from retrieved page content, links and asset descriptions, not rendered-browser visual audits or conversion analytics. See the research report for individual observations and limitations.

## Launch scope

Publication updates the existing private review Site only. Existing domain/DNS and audience are preserved. Real-device responsive QA and any future domain cutover remain separate launch tasks.
