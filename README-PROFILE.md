# Profilbild Setup

Das Profilbild wird automatisch beim Start des Development-Servers kopiert.

Falls das automatische Kopieren nicht funktioniert, führe manuell aus:

```bash
# Option 1: Node.js Script
node copy-profile.js

# Option 2: Bash Script
bash setup-profile.sh

# Option 3: Manuell
cp ../profilepicture.png src/assets/images/profile.jpg
```

Das Bild wird dann unter `src/assets/images/profile.jpg` verfügbar sein und in der Hero-Sektion angezeigt.
