ARG BUILD_FROM=hassioaddons/base:15.0.5
FROM $BUILD_FROM as builder

ENV LANG C.UTF-8

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
  glib-dev \
  \
  && npm config set unsafe-perm true

WORKDIR /plejd
COPY ./package.json /plejd/
RUN npm install \
  --no-audit \
  --no-update-notifier \
  --unsafe-perm

FROM builder AS runtime
# Copy data for add-on
COPY ./*.js /plejd/
COPY ./config.json /plejd/
# Copy root filesystem
COPY rootfs /

# Build arguments
ARG BUILD_DATE
ARG BUILD_REF
ARG BUILD_VERSION

# Labels
LABEL \
  io.hass.name="Plejd" \
  io.hass.description="Adds support for the Swedish home automation devices from Plejd." \
  io.hass.arch="${BUILD_ARCH}" \
  io.hass.type="addon" \
  io.hass.version=${BUILD_VERSION} \
  maintainer="chickenTurtle" \
  org.label-schema.description="Adds support for the Swedish home automation devices from Plejd." \
  org.label-schema.build-date=${BUILD_DATE} \
  org.label-schema.name="Plejd" \
  org.label-schema.schema-version="1.0" \
  org.label-schema.usage="https://github.com/chickenTurtle/plejd/tree/master/README.md" \
  org.label-schema.vcs-ref=${BUILD_REF} \
  org.label-schema.vcs-url="https://github.com/chickenTurtle/plejd"

