const fs = require('fs');
const path = require('path');
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('Dependency `sharp` not found. Install it with `npm install sharp` in the project root.');
  process.exit(1);
}

const svgDir = path.join(__dirname, '..', 'screenshots');
if (!fs.existsSync(svgDir)) {
  console.error('Screenshots directory not found:', svgDir);
  process.exit(1);
}

const files = fs.readdirSync(svgDir).filter(f => f.endsWith('.svg'));
if (files.length === 0) {
  console.log('No SVG files to convert in', svgDir);
  process.exit(0);
}

files.forEach(file => {
  const svgPath = path.join(svgDir, file);
  const pngName = file.replace(/\.svg$/i, '.png');
  const pngPath = path.join(svgDir, pngName);
  sharp(svgPath)
    .png({quality: 90})
    .toFile(pngPath)
    .then(() => console.log('Created', pngPath))
    .catch(err => console.error('Error creating', pngPath, err));
});
