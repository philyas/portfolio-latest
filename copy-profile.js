const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '..', 'profilepicture.png');
const dest = path.join(__dirname, 'src', 'assets', 'images', 'profile.jpg');

// Ensure destination directory exists
const destDir = path.dirname(dest);
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy file
fs.copyFileSync(source, dest);
console.log('Profilbild erfolgreich kopiert!');
