const fs = require('fs');

async function copyDir() {
  const startDir = './04-copy-directory/files';
  const newDir = './04-copy-directory/files-copy';
  if (!fs.existsSync(newDir)) {
    fs.mkdirSync(newDir, { recursive: true });
  }
  const files = await fs.promises.readdir(startDir);
  for (const file of files) {
    const startFile = `${startDir}/${file}`;
    const newFile = `${newDir}/${file}`;
    await fs.promises.copyFile(startFile, newFile);
  }
}

copyDir();