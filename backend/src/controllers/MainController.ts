import { Controller, Get } from "@tsed/common";
import * as si from 'systeminformation';
import * as os from 'node:os';

@Controller("/api")
export class MainController {

	@Get("/timestamp")
	timestamp() {
		return { "timestamp": new Date().toISOString() };
	}

	@Get("/status")
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

}
