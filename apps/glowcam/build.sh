#!/bin/bash
# Copies index.html into GlowCam.app and packs GlowCam-mac.zip (keeps the launcher executable).
set -e
cd "$(dirname "$0")"
cp index.html GlowCam.app/Contents/Resources/index.html
chmod +x GlowCam.app/Contents/MacOS/GlowCam
rm -f GlowCam-mac.zip
zip -qr GlowCam-mac.zip GlowCam.app README.md
echo "GlowCam-mac.zip готов"
