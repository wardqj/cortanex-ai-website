# CortaNex V3: visual direction and research

Reviewed 21 October 2026. This pass preserves the V2 company proposition and product maturity. It enriches the presentation and delivery explanation without rewriting the original copy.

## Reference method

Eight selected award-recognized technology/product/studio sites were researched through primary Awwwards records and company pages. The award applies to the version submitted on the stated date; a current homepage may differ. These are qualitative references, not conversion-performance evidence or an exhaustive award census. Four references share basement as creator, so they do not represent four independent design traditions.

Browser visits were also attempted for current Dayos, Daylight, Next.js Conf, USAvionix, Atoll and Lusion pages. Dayos and Daylight provided rendered visual references. Next.js Conf exposed its current event page and interactions in the browser. Lusion and Atoll remained at their loading compositions during the sampled observations; they are not counted as complete rendered-page audits. USAvionix exposed its technical narrative, initialization scene and contact paths. No external site's purchase, account or contact submission was tested.

| Reference | Verified award record | Principle used |
| --- | --- | --- |
| Dayos | [SOTD, 29 May 2025](https://www.awwwards.com/sites/dayos) | A focused operational proposition, an inspectable mechanism and a clear primary action. The current [company page](https://www.dayos.com/) differs from the award-linked submission. Its results and integration claims are not CortaNex evidence. |
| Daylight | [SOTD, 18 June 2024](https://www.awwwards.com/sites/daylight) | The record highlights product CTA, parallax, illustration and hover interaction. The [current page](https://daylightcomputer.com/) gives its product a tangible setting. CortaNex retains its own abstract flow artwork and action hierarchy. |
| Next.js Conf | [SOTD, 16 September 2024](https://www.awwwards.com/sites/next-js-conf-1) | Interactive components and CTA feedback are explicit award elements. The [current conference route](https://nextjs.org/conf) serves a later event page; it is not treated as the 2024 submission. Use consistent selected, hover and press states. |
| Lusion v3 | [SOTD, 2 October 2023](https://www.awwwards.com/sites/lusion-v3) | The [studio](https://lusion.co/) foregrounds immersive work and its creative mechanism. Borrow spatial coherence while keeping CortaNex's actual text and controls immediately available. |
| Atoll Digital | [SOTD, 24 March 2025](https://www.awwwards.com/sites/atoll-digital-1) | Its award record describes an industrial/futuristic design and highlights scrolling and transitions. The [current site](https://atolldigital.com/) supports a deliberate editorial hierarchy; browser review of the full rendered page was limited by its loading state. |
| USAvionix | [SOTD, 9 September 2026](https://www.awwwards.com/sites/usavionix) | The [company page](https://www.usavionix.com/) organizes technical narrative around missions and demo/contact access. CortaNex's decorative motion never becomes fake operational telemetry. |
| basement studio | [SOTD, 25 April 2025](https://www.awwwards.com/sites/basement-studio-3) | The award identifies 3D scenes and a disciplined palette. The [studio](https://basement.studio/) separates concrete work from capabilities. Apply contrasting section proportions and material depth. |
| 8bit AI | [SOTD, 21 July 2025](https://www.awwwards.com/sites/8bit-ai) | The record documents text, camera, particle and WebGL transitions. The [homepage](https://www.8bit.ai/) was not sufficiently extractable to assess its current CTA flow. Transfer restrained ambient movement, not a heavyweight manifesto experience. |

## Design decisions implemented

- Retain the approved outlined logo, Manrope headings, Inter body copy and blue/navy identity. Use the approved standalone symbol at the narrowest header width rather than shrinking the full wordmark below its minimum.
- Refine the header into an inset translucent surface, add active-section feedback and a thin reading indicator.
- Give the existing hero artwork modest pointer depth and an abstract Canvas flow layer. Neither is a product screen or customer record.
- Use consistent pill actions, arrow feedback, focus outlines and selected tabs. Keep the dock quiet while the hero or closing contact actions are visible, then expose it during exploration.
- Improve the scenario workspace's hierarchy and transition its record changes. Preserve every existing scenario and decision-owner statement.
- Contrast the industrial capability card with lighter inventory/customer cards. Add a decorative engineering schematic without introducing product controls or claims.
- Refine ManuQube's umbrella/module surface and transitions. All four initial release qualifiers and both roadmap areas remain intact.
- Add working-output labels to the delivery stages and a short explanation of workflow, information and review principles. These describe the intended engagement approach, not measured customer outcomes.

## Free tooling and performance decisions

[Motion](https://motion.dev/docs/quick-start) 14.5.0 is pinned and bundled through its mini API, with esbuild 0.28.2. The animation module is approximately 14KB before compression. Its dependency-chain MIT notices ship locally. No paid plugin, animation CDN, external font request or runtime package installation is required. Node/npm are authoring/CI tools; Docker still serves prebuilt static files.

Native CSS, Web Animations and Canvas supply the remaining effects. Canvas is capped to a device-pixel ratio of 1.5 and approximately 30 updates per second, and stops when the hero is outside the viewport or the document is hidden. Pointer depth is enabled only for fine pointers. There is no scroll hijacking, custom cursor, blocking preloader, automatic audio or third-party tracking.

A visible control pauses optional motion. Operating-system reduced motion starts the optional effects paused; static equivalents and original content remain. No CSS rule pre-hides content in anticipation of a script-driven reveal. Forced-colors fallbacks remove the transparent gradient fill and decorative layers.

## Evidence and validation

See `v3-qa.md` for the actual checks and remaining limits. The original 207 normalized text nodes are retained in order, and original scenario/module data is verified against a baseline. The automated preservation check is included in CI.

Award recognition supports studying craft; it does not establish conversion uplift, product reliability, CortaNex market leadership or factory validation.
