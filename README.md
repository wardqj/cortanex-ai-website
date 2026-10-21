# CortaNex AI website

The redesigned CortaNex AI landing page, organized as a standalone static website with Docker Compose and NGINX. The existing design, approved vector logo, local fonts, artwork and interactive workflows are preserved.

## Run with Docker Compose

Install Docker Engine with the Compose v2 plugin, or Docker Desktop. From the repository root:

```sh
docker compose up -d --build --wait
```

Open **http://localhost:8080**. The default binding is local-only (`127.0.0.1`). The container serves HTTP on port 8080 as a non-root user with a read-only root filesystem.

Optional configuration:

```sh
cp .env.example .env
```

Edit `.env` to change `PORT`, `BIND_ADDRESS` or the base-image reference. For deliberate network exposure, set `BIND_ADDRESS=0.0.0.0`; provide HTTPS through your own reverse proxy or load balancer. The Compose file does not configure a domain, certificates or application authentication. Publishing a port is separate from the private GitHub repository's access settings.

## Common commands

```sh
docker compose ps
docker compose logs -f web
docker compose down
# Rebuild after changing HTML, CSS, JavaScript or assets:
docker compose up -d --build --wait
# Refresh the upstream image and rebuild:
docker compose build --pull
docker compose up -d --wait
```

Source files are copied into the image. This is intentionally not a live-reload development server; rebuild after edits.

## Repository layout

| Path | Purpose |
| --- | --- |
| `public/index.html` | Landing-page content, metadata and native project-brief dialog |
| `public/styles.css` | Responsive layout, local fonts and reduced-motion rules |
| `public/polish.css` | V3 visual refinement layer |
| `src/effects.js` | Editable Motion/Canvas enhancement source |
| `public/effects.js` | Self-hosted bundled enhancement module |
| `public/app.js` | Scenarios, module tabs, mobile menu and WhatsApp draft |
| `public/assets/` | Approved logos, fonts/licenses, favicons and hero artwork |
| `public/research.html` | Supporting 25-company website comparison |
| `docker/nginx.conf` | Static routing, response headers, compression and health endpoint |
| `Dockerfile` | Non-root NGINX image, port 8080 and health check |
| `compose.yaml` | Service, port, restart policy and container runtime settings |
| `scripts/` | Dependency-free source validation and HTTP smoke check |
| `.github/workflows/validate.yaml` | Source checks, container build and Compose smoke test |
| `docs/` | Architecture, deployment guidance, design QA and research |

## Visual polish and motion

The V3 polish preserves all original copy and scenario/module data. It adds a refined header and action dock, local Motion transitions, an abstract Canvas flow, richer capability visuals and delivery explanations. Motion 14.5.0 is MIT-licensed and self-hosted; there is no runtime CDN or paid effect dependency. The motion control and OS reduced-motion setting provide static alternatives.

To change the animation source, use Node.js 22+ and npm:

```sh
npm ci
# Edit src/effects.js, then rebuild the committed browser module:
npm run build:effects
npm run check
```

Docker Compose serves the committed `public/` files, so Node is not required to run the website. See [design rationale](docs/visual-polish-research.md) and [V3 QA](docs/v3-qa.md).

## Checks

```sh
python3 scripts/validate.py
python3 scripts/verify-content.py
node --check public/app.js
docker compose config --quiet
docker compose build --pull
docker compose run --rm --no-deps web -t
docker compose up -d --wait
python3 scripts/smoke.py
```

GitHub Actions runs these checks on pushes to `main`, pull requests and manual dispatch. A green run validates the container configuration and HTTP routes; it does not certify mobile layout or accessibility. See [deployment guidance](docs/deployment.md) and [QA notes](docs/design-qa.md).

## Content and contact behavior

The page distinguishes CortaNex's implementation services from ManuQube's initial MES, OMS, RMS and QMS releases. Warehouse and maintenance remain roadmap scope. Interactive records are labelled illustrative and do not represent customer results.

The project brief stays in browser memory. It shows a review before offering a WhatsApp draft addressed to Ward's supplied business number, +962 79 871 6666. Visitors choose when to send. There is no backend form, database, analytics or local-storage persistence.

## Ownership and deployment

This source handoff does not alter the existing CortaNex domain, DNS or review Site. Canonical/social URL metadata still refers to the review Site; update it when the final domain is approved. The research page is supporting material and can be excluded from a later public marketing release if desired.

No open-source license is granted for the company site, logo or artwork. Bundled fonts retain their respective OFL notices in `public/assets/`. See [third-party notices](THIRD_PARTY_NOTICES.md).
