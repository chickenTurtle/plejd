ARG BUILD_FROM=ghcr.io/hassio-addons/base:18.1.4
FROM $BUILD_FROM AS builder

ENV LANG=C.UTF-8

# Set shell
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ARG BUILD_ARCH

# Install Node
RUN apk add --no-cache jq
RUN \
  apk add --no-cache --virtual .build-dependencies \
  g++ \
  gcc \
  libc-dev \
  linux-headers \
  make \
  python3 \
  bluez \
  eudev-dev \
  zlib-dev \
  \
  && apk add --no-cache \
  git \
  nodejs \
  npm \
  dbus-dev \
  glib-dev

WORKDIR /plejd
COPY ./plejd/package.json /plejd/
RUN npm install --omit=dev \
  --no-audit \
  --no-update-notifier

FROM builder AS runtime
# Copy data for add-on
COPY ./plejd/src /plejd/
COPY ./plejd/config.json /plejd/
# Copy root filesystem
COPY ./plejd/rootfs /

RUN chmod +x /usr/bin/plejd.sh
RUN chmod +x /etc/services.d/plejd/run
RUN chmod +x /etc/services.d/plejd/finish

# # Build arguments
ARG BUILD_DATE
ARG BUILD_REF
ARG BUILD_VERSION
