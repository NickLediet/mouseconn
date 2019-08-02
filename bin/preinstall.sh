#!/usr/bin/env bash

# Prompt for sudo privs
sudo -v

########################
## Verify OS
########################

function osx-setup {
  echo 'OSX Detected...'
  echo 'Installing OSX Dependencies'

  brew install blueutil
}

function linx-setup {
  echo 'Linux Detects'
  # TODO: Add check for distro to install with correct package manager
  sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev -y
}

if [[ "$OSTYPE" =~ ^darwin ]]; then
  osx-setup
else
  linux-setup
fi
