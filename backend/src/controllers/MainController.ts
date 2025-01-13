import { Controller, Get } from "@tsed/common"
import * as os from 'node:os'
import { SystemService } from '../service/SystemService';
import { BackupsService } from '../service/BackupsService';
import { GitHubService } from '../service/GitHubService';

@Controller('/api')
export class MainController {

	constructor(
		public systemService: SystemService,
		public backupsService: BackupsService,
		public githubService: GitHubService,
	) { }

	@Get('/timestamp')
	timestamp() {
		return { timestamp: new Date().toISOString() }
	}

	@Get('/status')
	async status() {
		return {
			diskspace: await this.systemService.diskspace(),
			loadAverage: os.loadavg(),
			uptime: Number(os.uptime().toFixed(0)),
			memory: {
				total: os.totalmem(),
				free: os.freemem(),
				used: os.totalmem() - os.freemem(),
				percentage: ((os.totalmem() - os.freemem()) / os.totalmem()) * 100,
			},
			cpu: this.systemService.cpuUsage
		}
	}

	@Get('/backups')
	async backups() {
		return {
			worlds: this.backupsService.worlds(),
			git: await this.backupsService.git(),
			databases: this.backupsService.databases()
		}
	}

	@Get('/showcase')
	async showcase() {
		let tree = await this.githubService.get('https://api.github.com/repos/ProjectEdenGG/CMS/git/trees/master?recursive=true')
		let config = await this.githubService.get('https://raw.githubusercontent.com/ProjectEdenGG/CMS/master/showcase/config.json')

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
