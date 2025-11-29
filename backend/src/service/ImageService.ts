import { Injectable } from '@tsed/di';
import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs';
import { $log } from '@tsed/common';
import sharp from 'sharp';
import { Utils } from '../utils/Utils.js';

@Injectable()
export class ImageService {

	private generateRandomFilename(): string {
		const chars = Utils.ALPHABET.toUpperCase() + Utils.ALPHABET.toLowerCase() +  Utils.NUMBERS;
		let filename = '';
		for (let i = 0; i < 5; i++)
			filename += chars.charAt(Math.floor(Math.random() * chars.length));
		return filename;
	}

	async upload(file: Express.Multer.File) {
		try {
			let paths = os.platform() == 'win32' ? 'C:/Users/Griffin/Pictures/Mercury' : '/srv/http/i';
			const directory = path.resolve(paths);

			fs.mkdirSync(directory, { recursive: true });

			let filename
			let filepath

			while (true) {
				filename = `${this.generateRandomFilename()}.webp`;
				filepath = path.join(directory, filename);

				if (!fs.existsSync(filepath))
					break;
			}

			const webpBuffer = await sharp(file.buffer).webp().toBuffer();

			fs.writeFileSync(filepath, webpBuffer);

			$log.info(`Image uploaded successfully: ${filename}`);

			return {
				success: true,
				filename: filename,
				url: `https://i.projecteden.gg/${filename}`,
				originalName: file.originalname,
				size: file.size,
				path: filepath
			};
		} catch (error) {
			$log.error('Image upload failed:', error);
			throw error;
		}
	}

}
