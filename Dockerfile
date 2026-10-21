# The stable tag receives upstream patches. For reproducible releases, set an
# approved immutable digest using the NGINX_IMAGE build argument.
ARG NGINX_IMAGE=nginx:stable-alpine
FROM ${NGINX_IMAGE}

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY public/ /usr/share/nginx/html/

USER nginx
EXPOSE 8080
STOPSIGNAL SIGQUIT
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
# Skip the stock entrypoint: this image needs no runtime config rewriting.
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
