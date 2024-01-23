const fs = require('fs');

async function copyDir() {
  const startDir = './04-copy-directory/files';
  const newDir = './04-copy-directory/files-copy';
  try {
    await fs.promises.access(newDir);
  } catch (error) {
    await fs.promises.mkdir(newDir, { recursive: true });
  }
  const files = await fs.promises.readdir(startDir);
  await Promise.all(
    files.map(async (file) => {
      const startFile = `${startDir}/${file}`;
      const newFile = `${newDir}/${file}`;
      await fs.promises.copyFile(startFile, newFile);
    })
  );
}

copyDir();