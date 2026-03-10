import * as fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const sourceDir = 'd:/tools/fakedetail/src/header';
const targetDir = 'd:/tools/fakedetail/src/header_cropped';

async function processImages() {
    const files = await fs.readdir(sourceDir);
    const jpgFiles = files.filter(f => f.toLowerCase().endsWith('.jpg'));

    // Sort them so they are numbered consistently
    jpgFiles.sort();

    await fs.mkdir(targetDir, { recursive: true });

    const originalFiles = jpgFiles.filter(f => !/^\d{2}\.jpg$/.test(f));
    const renamedFiles = jpgFiles.filter(f => /^\d{2}\.jpg$/.test(f));

    const allFilesToProcess = [...renamedFiles];

    // Highest existing number
    let count = renamedFiles.length > 0 ?
        Math.max(...renamedFiles.map(f => parseInt(f, 10))) + 1 : 1;

    for (const file of originalFiles) {
        const paddedNum = count.toString().padStart(2, '0');
        const newName = `${paddedNum}.jpg`;

        const sourcePath = path.join(sourceDir, file);
        const renamedSourcePath = path.join(sourceDir, newName);

        // Rename original
        await fs.rename(sourcePath, renamedSourcePath);
        console.log(`Renamed ${file} to ${newName}`);
        allFilesToProcess.push(newName);
        count++;
    }

    // Now process all renaming
    for (const newName of allFilesToProcess) {
        const renamedSourcePath = path.join(sourceDir, newName);
        const targetPath = path.join(targetDir, newName);

        const metadata = await sharp(renamedSourcePath).metadata();

        const extractTop = 800;
        const extractBottom = 800;

        if (metadata.height <= (extractTop + extractBottom)) {
            console.error(`Image ${newName} is too small to crop! Height is ${metadata.height}`);
            continue;
        }

        const extractHeight = metadata.height - extractTop - extractBottom;

        await sharp(renamedSourcePath)
            .extract({ left: 0, top: extractTop, width: metadata.width, height: extractHeight })
            .toFile(targetPath);

        console.log(`Cropped and saved to ${targetPath}`);
    }
}

processImages().catch(console.error);
