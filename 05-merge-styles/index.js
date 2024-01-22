const fs = require('fs');
const path = require('path');

const startDir = path.join(__dirname, 'styles');
const newDir = path.join(__dirname, 'project-dist', 'bundle.css');
const files = fs.readdirSync(startDir);
const cssFiles = files.filter(file => path.extname(file) === '.css');
const styles = cssFiles.map(file => {
  const filePath = path.join(startDir, file);
  return fs.readFileSync(filePath, 'utf8');
});
fs.writeFileSync(newDir, styles.join('\n'));
