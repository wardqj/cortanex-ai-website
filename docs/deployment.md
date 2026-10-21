# Architecture and deployment

## Runtime

One NGINX service serves the static site. No Node server, dependency installation, database, queue or application secrets are required. The image copies only `public/` and `docker/nginx.conf`. Documentation, Git history and environment files are excluded from the Docker build context.

NGINX listens on 8080 as the image's `nginx` user. Its PID and temporary paths live under `/tmp`, supplied as a bounded tmpfs by Compose. The official image's entrypoint is bypassed because no environment templating is needed. Root filesystem writes, privilege escalation and Linux capabilities are disabled for the service. Logs go to stdout/stderr with size rotation.

`GET /healthz` returns `ok`. Unknown paths return 404 rather than a fake successful page. HTML, CSS and unversioned assets revalidate so a deployment does not retain a long stale immutable cache. Local fonts avoid third-party font requests. The existing WhatsApp links are the only contact mechanism.

## Base image

The default `nginx:stable-alpine` tag follows upstream stable updates when rebuilt with `--pull`; existing images do not update themselves. For a reproducible release, set `NGINX_IMAGE` to a reviewed immutable `nginx@sha256:...` reference. No digest has been invented or claimed verified here. Rebuild and run CI after changing the reference.

## Server deployment

1. Clone the private repository using your own authorized GitHub authentication.
2. Install Docker Engine and Compose v2 on the host.
3. Configure `.env` from the example if a different bind address or port is needed.
4. Run `docker compose up -d --build --wait`.
5. Run `python3 scripts/smoke.py` (or supply the changed HTTP address as its first argument).
6. For a public website, terminate HTTPS in a separately configured reverse proxy/load balancer and set DNS deliberately. Review canonical/social metadata before domain cutover.

The default loopback binding is suitable for local review or a same-host reverse proxy. It will not expose the page to remote browsers. Repository privacy does not add authentication to the HTTP server. Do not put confidential material in `public/`.

## Updates and rollback

Pull the intended commit and rebuild using Compose. Keep the previous known-good commit or image reference. To roll back, check out that known-good commit and rebuild/restart. There is no database migration or persistent application data. Run smoke checks after either action.

## Verification status

The source was copied from the published V2 landing page and validated locally for links, assets and JavaScript syntax. Docker is unavailable in the authoring workspace, so no local container execution is claimed. The included GitHub Actions workflow performs the build, NGINX syntax check, Compose health wait and HTTP smoke checks when available on the repository's runner. Consult the actual run before calling container checks passed.

Desktop design and interaction checks for the original V2 are recorded separately in `design-qa.md`. Real-device mobile QA remains outstanding.

## Primary implementation references

- https://docs.docker.com/compose/gettingstarted/
- https://docs.docker.com/reference/cli/docker/compose/up/
- https://hub.docker.com/_/nginx
- https://nginx.org/en/docs/dirindex.html
- https://github.com/actions/checkout
