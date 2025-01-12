const chokidar = require('chokidar');
const fs = require('fs-extra');
const path = require('path');
const simpleGit = require('simple-git');

const PADDING = 80

const repo = simpleGit('.');
async function isIgnored(sourcePath) {
	return (await repo.checkIgnore([sourcePath])).length !== 0;
}

async function copyFileOnChange(sourcePath, targetDirectory) {
	if (sourcePath.includes('.git') || targetDirectory.includes('.git'))
		return;

	try {
		let targetPath = path.join(targetDirectory, sourcePath);
		if (await isIgnored(sourcePath)) {
			console.error(`${new Date().toISOString()}  ${sourcePath.padEnd(PADDING)} ->   ignored`);
		} else {
			await fs.copy(sourcePath, targetPath);
			console.log(`${new Date().toISOString()}  ${sourcePath.padEnd(PADDING)} ->   ${targetPath}`);
		}
	} catch (error) {
		console.error(`Error copying file: ${error.message}`);
	}
}

function watchDirectory(targetDir) {
	console.log(`Watching for changes in: ${__dirname}`);

	const watcher = chokidar.watch('.', {
		persistent: true,
		ignoreInitial: true
	});

	watcher.on('change', (filePath) => copyFileOnChange(filePath, targetDir));
	watcher.on('error', (error) => console.error(`Watcher error: ${error.message}`));
}

const targetDirectory = process.argv[2];

if (!targetDirectory) {
	console.log("Usage: node deploy.js <targetDirectory>");
	process.exit(1);
}

// Start watching the source directory
watchDirectory(targetDirectory);
