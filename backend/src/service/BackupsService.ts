import { Injectable } from "@tsed/di";
import fs from 'node:fs';
import path from 'node:path';
import { GitHubService } from './GitHubService';

@Injectable()
export class BackupsService {

	constructor(public githubService: GitHubService) { }

	worlds() {
		let worlds: any[] = JSON.parse(fs.readFileSync('/home/minecraft/servers/backups/smp/worlds.json').toString());
		worlds.map(world => world.timestamp = new Date(world.timestamp).toISOString())
		return worlds
	}

	async git() {
		let git: any = {}

		try {
			let repos: { [key: string]: string } = {
				server: 'ProjectEdenGG/Server',
				storage: 'ProjectEdenGG/Server-Storage',
			}

			for (let repo of Object.keys(repos)) {
				let commits = await this.githubService.get(`https://api.github.com/repos/${repos[repo]}/commits`)
				let commitsDetail = await Promise.all(commits.data.map((commit: any) => this.githubService.get(commit.url)))
				git[repo] = commitsDetail
					.filter(response => response.data.stats.total !== 0)
					.map(response => {
						response.data.stats.sha = response.data.sha
						response.data.stats.files = response.data.files.length
						response.data.stats.timestamp = new Date(response.data.commit.author.date).toISOString()
						return response.data.stats
					})
			}
		} catch (ex) {
			return {}
		}

		return git
	}

	databases() {
		let directoryPath: string = '/home/minecraft/servers/backups/smp/databases'

		let databases: any = {
			mysql: [],
			mongodb: []
		}

		fs.readdirSync(directoryPath).forEach(file => {
			let stats = fs.statSync(path.join(directoryPath, file))
			if (stats.isFile()) {
				let type: string = Object.keys(databases).filter(key => file.startsWith(key))[0] ?? 'other';
				(databases[type] ??= []).push({
					size: stats.size,
					timestamp: stats.mtime,
				})
			}
		})

		for (let database of Object.keys(databases)) {
			databases[database].sort((a: any, b: any) => b.timestamp - a.timestamp)
		}

		return databases
	}

}
