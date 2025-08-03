import { Injectable } from "@tsed/di";
import * as fs from "fs";
import * as path from "path";
import { __dirname } from '../Server.js';

@Injectable()
export class ConfigService {
	public secrets: any;

	constructor() {
		const secretsPath = path.resolve(__dirname, "../config/secrets.json");
		try {
			const data = fs.readFileSync(secretsPath, "utf8");
			this.secrets = JSON.parse(data);
		} catch (error) {
			console.error("Error loading secrets.json:", error);
			throw new Error("Unable to load secrets.json");
		}
	}

}
