import { Controller, Get } from "@tsed/common"
import * as si from 'systeminformation'
import * as os from 'node:os'
import axios from 'axios'
import { ConfigService } from "../service/ConfigService"
import * as fs from 'node:fs'
import path from 'node:path'

@Controller('/api')
export class MainController {

	constructor(
		public configService: ConfigService
	) { }

	@Get('/timestamp')
	timestamp() {
		return { timestamp: new Date().toISOString() }
	}

	@Get('/status')
	async status() {
		return {
			server: {
				loadAverage: os.loadavg(),
				uptime: os.uptime(),
				memory: {
					total: os.totalmem(),
					free: os.freemem(),
					used: os.totalmem() - os.freemem()
				},
				diskspace: await this.diskspace()
			},
			backups: {
				worlds: this.worlds(),
				git: await this.git(),
				databases: this.databases()
			}
		}
	}

	private diskspace() {
		return new Promise<any>(async resolve => {
			si.fsSize(os.platform() === 'win32' ? 'C:' : '/dev/md2').then((result: any) => {
				resolve({
					total: result[0].size,
					used: result[0].used,
					free: result[0].available
				})
			})
		});
	}

	private worlds() {
		return JSON.parse(fs.readFileSync('/home/minecraft/servers/backups/smp/worlds.json').toString());
	}

	private async git() {
		let git: any = {}
		let repos: { [key: string]: string } = {
			server: 'ProjectEdenGG/Server',
			storage: 'ProjectEdenGG/Server-Storage',
		}

		for (let repo of Object.keys(repos)) {
			let commits = await this.github(`https://api.github.com/repos/${repos[repo]}/commits`)
			let commitsDetail = await Promise.all(commits.data.map((commit: any) => this.github(commit.url)))
			git[repo] = commitsDetail
				.filter(response => response.data.stats.total !== 0)
				.map(response => {
					response.data.stats.sha = response.data.sha
					response.data.stats.files = response.data.files.length
					response.data.stats.timestamp = response.data.commit.author.date
					return response.data.stats
				})
		}

		return git
	}

	private databases() {
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

		return databases
	}

	private async github(url: string) {
		return await axios.get(url, {
			headers: {
				'Accept': 'application/vnd.github+json',
				'Authorization': `Bearer ${this.configService.secrets.github.token}`,
				'X-GitHub-Api-Version': '2022-11-28'
			}
		})
	}

	@Get('/showcase')
	async showcase() {
		let tree = await this.github('https://api.github.com/repos/ProjectEdenGG/CMS/git/trees/master?recursive=true')
		let config = await this.github('https://raw.githubusercontent.com/ProjectEdenGG/CMS/master/showcase/config.json')

		let data: any = []

		for (let entry of tree.data.tree) {
			let split = entry.path.split('/')
			if (split.length !== 3)
				continue

			if (split[0] !== 'showcase')
				continue

			let name = split[1]
			let folder = data.find((_folder: any) => _folder.name == name)
			if (!folder)
				data.push(folder = config.data[name] ?? {})

			folder.name = name
			folder.files = folder.files ?? []

			if (entry.path.endsWith('thumb.png')) {
				folder.thumbnail = 'https://raw.githubusercontent.com/ProjectEdenGG/CMS/master/' + entry.path
			} else if (entry.path.endsWith('.png')) {
				folder.files.push('https://raw.githubusercontent.com/ProjectEdenGG/CMS/master/' + entry.path)
			}
		}

		return data
	}

}
