# syntax=docker/dockerfile:1.7

ARG ALPINE_VERSION=3.23
ARG DEPS_IMAGE=ghcr.io/jose-mrqz/monthly-py-deps:latest
ARG DBMATE_IMAGE=ghcr.io/amacneil/dbmate:2.34.1

FROM ${DBMATE_IMAGE} AS dbmate

FROM ${DEPS_IMAGE} AS deps

FROM deps AS build

WORKDIR /src

COPY package.json bun.lock tsconfig.json ./
COPY src ./src

RUN bun install --frozen-lockfile \
    && bun build --compile --outfile monthly-py ./src/index.tsx

FROM alpine:${ALPINE_VERSION} AS execute

RUN apk add --no-cache \
    ca-certificates \
    curl \
    libgcc \
    libstdc++ \
    sqlite-libs

WORKDIR /app

COPY --from=build /src/monthly-py /usr/local/bin/monthly-py
COPY --from=dbmate /usr/local/bin/dbmate /usr/local/bin/dbmate
COPY db/migrations/*.sql /app/migrations/
COPY docker-entrypoint.sh /usr/local/bin/monthly-py-entrypoint

RUN chmod +x /usr/local/bin/monthly-py-entrypoint \
    && mkdir -p /app/data

ENV TZ=UTC \
    DB_URL=/app/data/monthly-py.db

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -fs http://127.0.0.1:3000/healthcheck/ >/dev/null || exit 1

ENTRYPOINT ["monthly-py-entrypoint"]
