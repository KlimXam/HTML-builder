const fs = require('fs');
const path = require('path');
const folderPath = path.join(__dirname, 'secret-folder');
const files = fs.readdirSync(folderPath, { withFileTypes: true });

files.forEach((file) => {
  if (file.isFile()) {
    const fileName = path.parse(file.name).name;
    const fileExtension = path.extname(file.name).slice(1);
    const filePath = path.join(folderPath, file.name);
    const fileStats = fs.statSync(filePath);
    const fileSize = fileStats.size;
    
    console.log(`${fileName} - ${fileExtension} - ${fileSize} байт`);
  }
});