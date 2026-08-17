#!/usr/bin/env bash
#
# Purge the Cloudflare edge cache for unityaliving.com.
# Run after ANY deploy that changes HTML or /public assets (or call it standalone
# whenever the edge is serving stale content). Reads CF_ZONE_ID / CF_API_TOKEN
# from .deploy.env (gitignored).
#
set -euo pipefail
cd "$(dirname "$0")"
[ -f .deploy.env ] && . ./.deploy.env
: "${CF_ZONE_ID:?set CF_ZONE_ID in .deploy.env}"
: "${CF_API_TOKEN:?set CF_API_TOKEN in .deploy.env}"

curl -fsS -X POST "https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache" \
  -H "Authorization: Bearer ${CF_API_TOKEN}" -H "Content-Type: application/json" \
  -d '{"purge_everything":true}'
echo
