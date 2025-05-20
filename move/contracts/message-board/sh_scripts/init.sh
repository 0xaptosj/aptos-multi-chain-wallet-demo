#!/bin/sh

set -e

echo "##### Creating a new Aptos account #####"

aptos init \
  --network devnet \
  --profile devnet-profile-1
