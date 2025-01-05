import { Controller, Get } from "@tsed/common";
import * as si from 'systeminformation';
import * as os from 'node:os';
import axios from 'axios';
import { ConfigService } from "../service/ConfigService";

@Controller('/api')
export class MainController {

	constructor(
		public configService: ConfigService
	) { }

	@Get('/timestamp')
	timestamp() {
		return { 'timestamp': new Date().toISOString() }
	}

	@Get('/status')
	status() {
		let status: any = {
			loadAverage: os.loadavg(),
			uptime: os.uptime(),
			memory: {
				total: os.totalmem(),
				free: os.freemem(),
				used: os.totalmem() - os.freemem()
			}
		}

		return new Promise<any>(resolve => {
			si.fsSize(os.platform() === 'win32' ? 'C:' : '/dev/md2').then((result: any) => {
				status.diskspace = {
					total: result[0].size,
					used: result[0].used,
					free: result[0].available
				}

				resolve(status)
			})
		})
	}

	@Get('/showcase')
	async showcase() {
		let headers = {
			'Accept': 'application/vnd.github+json',
			'Authorization': `Bearer ${this.configService.secrets.github.token}`,
			'X-GitHub-Api-Version': '2022-11-28'
		}
		let tree = await axios.get('https://api.github.com/repos/ProjectEdenGG/CMS/git/trees/master?recursive=true', { headers })
		let config = await axios.get('https://raw.githubusercontent.com/ProjectEdenGG/CMS/master/showcase/config.json', { headers })

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
