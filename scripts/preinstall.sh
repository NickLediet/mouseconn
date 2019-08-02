#!/usr/bin/env bash

# Prompt for sudo privs
sudo -v

########################
## Verify OS
########################

function osx-setup {
  echo 'OSX Detected'
}

function linx-setup {
  echo 'Linux Detects'
  # TODO: Add check for distro to install with correct package manager
}

if [[ "$OSTYPE" =~ ^darwin ]]; then
  osx-setup
else
  linux-setup
fi
