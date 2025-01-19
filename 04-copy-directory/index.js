const fs = require('fs/promises');
const path = require('path');
const dirPath = path.join(__dirname, 'files');
const dirPathCopy = path.join(__dirname, 'files-copy');

async function copyDir() {
  await fs.mkdir(dirPathCopy, { recursive: true });
  const files = await fs.readdir(dirPath, { withFileTypes: true });

  await Promise.all(
    files.map(async (file) => {
      const src = path.join(dirPath, file.name);
      const dest = path.join(dirPathCopy, file.name);
      await fs.copyFile(src, dest);
    }),
  );
}

copyDir();
