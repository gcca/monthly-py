# syntax=docker/dockerfile:1.7

ARG ALPINE_VERSION=3.23
ARG DEPS_IMAGE=ghcr.io/jose-mrqz/monthly-py-deps:latest
ARG DBMATE_IMAGE=ghcr.io/amacneil/dbmate:2.34.1

FROM ${DBMATE_IMAGE} AS dbmate

FROM --platform=$BUILDPLATFORM ${DEPS_IMAGE} AS deps

FROM deps AS build

ARG TARGETARCH

WORKDIR /src

COPY package.json bun.lock tsconfig.json ./
COPY src ./src

RUN bun install --frozen-lockfile

RUN case "${TARGETARCH}" in \
        amd64) BUN_ARCH="x64" ;; \
        arm64) BUN_ARCH="arm64" ;; \
        *) echo "Unsupported architecture: ${TARGETARCH}" >&2; exit 1 ;; \
    esac \
    && bun build --compile --target="bun-linux-${BUN_ARCH}-musl" --outfile monthly-py ./src/index.tsx

FROM alpine:${ALPINE_VERSION} AS execute

RUN apk add --no-cache \
    ca-certificates \
    curl \
    libgcc \
    libstdc++ \
    sqlite-libs \
    sqlite

WORKDIR /app

COPY --from=build /src/monthly-py /usr/local/bin/monthly-py
COPY --from=dbmate /usr/local/bin/dbmate /usr/local/bin/dbmate
COPY db/migrations/*.sql /app/migrations/
# FIXME: delete me.
COPY db/fixtures/*.sql /app/fixtures/
COPY docker-entrypoint.sh /usr/local/bin/monthly-py-entrypoint

RUN chmod +x /usr/local/bin/monthly-py-entrypoint \
    && mkdir -p /app/data

ENV TZ=UTC \
    DB_URL=/app/data/monthly-py.db

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -fs http://127.0.0.1:3000/healthcheck/ >/dev/null || exit 1

ENTRYPOINT ["monthly-py-entrypoint"]
