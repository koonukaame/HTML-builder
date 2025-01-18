const fs = require('fs/promises');
const path = require('path');
const dirPath = path.join(__dirname, 'secret-folder');

async function readDir() {
  const files = await fs.readdir(dirPath, { withFileTypes: true });

  await Promise.all(
    files.map(async (file) => {
      if (file.isFile()) {
        const filePath = path.join(dirPath, file.name);
        const fileStats = await fs.stat(filePath);

        const ext = path.extname(file.name).slice(1, file.length);
        const name = path.basename(file.name, `.${ext}`);
        const size = fileStats.size / 1024;
        console.log(`${name} - ${ext} - ${size.toFixed(2)}kb`);
      }
    }),
  );
}

readDir();
