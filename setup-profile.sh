#!/bin/bash
# Script zum Kopieren des Profilbilds in die Assets

SOURCE="../profilepicture.png"
DEST="src/assets/images/profile.jpg"
DEST_DIR="src/assets/images"

# Erstelle Zielverzeichnis falls es nicht existiert
mkdir -p "$DEST_DIR"

# Kopiere das Bild
if [ -f "$SOURCE" ]; then
  cp "$SOURCE" "$DEST"
  echo "✅ Profilbild erfolgreich nach $DEST kopiert!"
else
  echo "❌ Fehler: $SOURCE nicht gefunden!"
  exit 1
fi
