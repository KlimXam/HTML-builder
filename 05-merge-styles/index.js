const fs = require('fs').promises;
const path = require('path');
const startDir = path.join(__dirname, 'styles');
const newDir = path.join(__dirname, 'project-dist', 'bundle.css');

async function newFiles() {
  try {
    const files = await fs.readdir(startDir);
    const cssFiles = files.filter(file => path.extname(file) === '.css');
    const styles = await Promise.all(cssFiles.map(async file => {
      const filePath = path.join(startDir, file);
      return await fs.readFile(filePath, 'utf8');
    }));
    await fs.writeFile(newDir, styles.join('\n'));
  } catch (error) {
    console.error(error);
  }
}

newFiles();