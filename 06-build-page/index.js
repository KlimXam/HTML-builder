const fs = require('fs');
const path = require('path');

const distFolder = path.join(__dirname, 'project-dist');
fs.mkdirSync(distFolder);

let templateFile = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');

const tagNames = templateFile.match(/{{(.*?)}}/g);

tagNames.forEach((tagName) => {
  const componentName = tagName.replace(/{{|}}/g, '');
  const componentFile = fs.readFileSync(path.join(__dirname, 'components', `${componentName}.html`), 'utf8');
  templateFile = templateFile.replace(tagName, componentFile);
});

fs.writeFileSync(path.join(distFolder, 'index.html'), templateFile);

const startDir1 = path.join(__dirname, 'styles');
const newDir1 = path.join(__dirname, 'project-dist', 'style.css');
const files = fs.readdirSync(startDir1);
const cssFiles = files.filter(file => path.extname(file) === '.css');
const styles = cssFiles.map(file => {
  const filePath = path.join(startDir1, file);
  return fs.readFileSync(filePath, 'utf8');
});
fs.writeFileSync(newDir1, styles.join('\n'));

async function copyDir() {
    const startDir = './06-build-page/assets';
    const newDir = './06-build-page/project-dist/assets';
  
    const copyRecursive = async (source, destination) => {
      const stat = await fs.promises.stat(source);
      if (stat.isDirectory()) {
        if (!fs.existsSync(destination)) {
          fs.mkdirSync(destination, { recursive: true });
        }
        const files = await fs.promises.readdir(source);
        for (const file of files) {
          const sourceFile = path.join(source, file);
          const destinationFile = path.join(destination, file);
          await copyRecursive(sourceFile, destinationFile);
        }
      } else {
        await fs.promises.copyFile(source, destination);
      }
    };
    await copyRecursive(startDir, newDir);
  }
  
  copyDir();