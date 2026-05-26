#!/bin/sh
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh" 2>/dev/null || true
cd /Users/melolabourique/your-digital-assistant
exec /Users/melolabourique/.nvm/versions/node/v24.15.0/bin/node \
     /Users/melolabourique/your-digital-assistant/node_modules/vite/bin/vite.js dev
