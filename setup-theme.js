const simpleGit = require('simple-git');
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const globby = require('globby');

const TEMP_DIR = path.join(__dirname, 'temp');

async function cloneRepo() {
  const git = simpleGit();
  console.log('Cloning the Twenty Twenty-Five theme...');
  await git.clone('https://github.com/WordPress/twentytwentyfive.git', TEMP_DIR);
  console.log('Clone complete.');
}

async function moveFilesToRoot() {
  console.log('Moving theme files to root directory...');

  const excludePatterns = [
    '**/.git/**',
    '**/.gitignore',
    '**/.gitattributes',
    '**/package.json',
    '**/package-lock.json',
    '**/composer.*',
    '**/node_modules/**',
    '**/temp/**'
  ];

  const files = await globby(['**/*'], {
    cwd: TEMP_DIR,
    dot: true,
    ignore: excludePatterns.map(p => p.replace('**/', ''))
  });

  for (const file of files) {
    const src = path.join(TEMP_DIR, file);
    const dest = path.join(__dirname, file);
    await fs.ensureDir(path.dirname(dest));
    await fs.copy(src, dest);
  }

  console.log('Files moved successfully.');
}

async function removeTempDir() {
  console.log('Removing temp folder...');
  await fs.remove(TEMP_DIR);
  console.log('Temp folder removed.');
}

async function replaceStrings() {
  const { themeName } = await inquirer.prompt({
    type: 'input',
    name: 'themeName',
    message: 'Enter the new theme name (replacing "Twenty Twenty-Five"):'
  });

  const files = await globby(['**/*.{php,css,js,html,txt,json,md}'], {
    gitignore: true,
    dot: false
  });

  for (const file of files) {
    const fullPath = path.join(__dirname, file);
    let content = await fs.readFile(fullPath, 'utf8');
    const newContent = content.replace(/Twenty Twenty-Five/g, themeName);
    if (newContent !== content) {
      await fs.writeFile(fullPath, newContent, 'utf8');
    }
  }

  console.log('Theme name replaced.');
}

async function updateStyleCss() {
  const { wpUser } = await inquirer.prompt({
    type: 'input',
    name: 'wpUser',
    message: 'Enter your WordPress.org username (for "Author:" value in style.css):'
  });

  const styleCssPath = path.join(__dirname, 'style.css');
  if (!fs.existsSync(styleCssPath)) {
    console.warn('style.css not found.');
    return;
  }

  let content = await fs.readFile(styleCssPath, 'utf8');

  content = content.replace(/Author:\s*.+/, `Author: ${wpUser}`);
  content = content.replace(/Description:\s*.+/, 'Description:');

  await fs.writeFile(styleCssPath, content, 'utf8');
  console.log('style.css updated.');
}

async function main() {
  try {
    await cloneRepo();
    await moveFilesToRoot();
    await removeTempDir();
    await replaceStrings();
    await updateStyleCss();
    console.log('Setup complete.');
  } catch (err) {
    console.error('An error occurred:', err);
  }
}

main();
