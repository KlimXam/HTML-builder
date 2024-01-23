const fs = require('fs').promises;
const path = require('path');

async function readFolder() {
  const folderPath = path.join(__dirname, 'secret-folder');
  try {
    const files = await fs.readdir(folderPath, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        const fileName = path.parse(file.name).name;
        const fileExtension = path.extname(file.name).slice(1);
        const filePath = path.join(folderPath, file.name);
        const fileStats = await fs.stat(filePath);
        const fileSize = fileStats.size;
        console.log(`${fileName} - ${fileExtension} - ${fileSize} байт`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

readFolder();