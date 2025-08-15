import { Injectable } from "@tsed/di";
import { ConfigService } from './ConfigService.js';
import axios from 'axios';

@Injectable()
export class GitHubService {
	headers: any

	constructor(public configService: ConfigService) {
		this.headers = {
			'Accept': 'application/vnd.github+json',
			'Authorization': `Bearer ${this.configService.files.secrets.github.token}`,
			'X-GitHub-Api-Version': '2022-11-28'
		};
	}

	public async get(url: string) {
		return await axios.get(url, { headers: this.headers })
	}

}
