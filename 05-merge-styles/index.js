const fs = require('fs/promises');
const path = require('path');

const cssPath = path.join(__dirname, 'styles');
const outputPath = path.join(__dirname, 'project-dist/bundle.css');

async function compileStyles() {
  const styleFiles = await fs.readdir(cssPath, { withFileTypes: true });
  const mergedFiles = await Promise.all(
    styleFiles
      .filter((file) => path.extname(file.name) === '.css')
      .map(async (file) => {
        const filePath = path.join(cssPath, file.name);
        // const ext = path.extname(file.name);
        // filePath.filter((el) => ext === '.css);
        return await fs.readFile(filePath, 'utf-8');
      }),
  );
  await fs.writeFile(outputPath, mergedFiles, 'utf-8');
}

compileStyles();
