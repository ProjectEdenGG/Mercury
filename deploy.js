const chokidar = require('chokidar');
const fs = require('fs-extra');
const path = require('path');

// Function to copy file to target directory
async function copyFileOnChange(sourcePath, targetDirectory) {
	if (!/.(ts|html|scss)$/.test(sourcePath))
		return;

	try {
		// Full target path
		const targetPath = path.join(targetDirectory, sourcePath);

		// Copy the file
		await fs.copy(sourcePath, targetPath);
		console.log(`${new Date().toISOString()} File modified: ${path.basename(sourcePath)}. Copied to ${targetDirectory}`);
	} catch (error) {
		console.error(`Error copying file: ${error.message}`);
	}
}

// Watch directory for changes
function watchDirectory(sourceDir, targetDir) {
	console.log(`Watching for changes in: ${sourceDir}`);

	// Initialize chokidar for watching the directory
	const watcher = chokidar.watch(sourceDir, {
		persistent: true,
		ignoreInitial: true // Ignore events for files existing at start
	});

	// Listen to the 'change' event
	watcher.on('change', (filePath) => {
		copyFileOnChange(filePath, targetDir);
	});

	// Error handling
	watcher.on('error', (error) => {
		console.error(`Watcher error: ${error.message}`);
	});
}

// Directories to watch and copy
const sourceDirectory = process.argv[2]; // First argument
const targetDirectory = process.argv[3]; // Second argument

if (!sourceDirectory || !targetDirectory) {
	console.log("Usage: node script.js <sourceDirectory> <targetDirectory>");
	process.exit(1);
}

// Start watching the source directory
watchDirectory(sourceDirectory, targetDirectory);
