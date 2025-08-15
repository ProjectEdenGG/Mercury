import { Injectable } from "@tsed/di";
import * as fs from "fs";
import * as path from "path";
import { __dirname } from '../Server.js';

@Injectable()
export class ConfigService {
	public files: any = {};

	private readonly CONFIGS = [
		'secrets',
		'applications'
	]

	constructor() {
		for (const file of this.CONFIGS) {
			try {
				const filePath = path.resolve(__dirname, `../config/${file}.json`);
				this.files[file] = JSON.parse(fs.readFileSync(filePath, "utf8"));
			} catch (error) {
				console.error(`Error loading ${file}.json:`, error);
			}
		}
	}

}
