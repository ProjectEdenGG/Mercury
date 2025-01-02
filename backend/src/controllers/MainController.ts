import { $log, Controller, Get } from "@tsed/common";
import { exec } from 'node:child_process';
import * as fs from 'node:fs';

@Controller("/")
export class MainController {

	@Get("/timestamp")
	timestamp() {
		return { "timestamp": new Date().toISOString() };
	}

	@Get("/status")
	status() {
		if (process.platform !== 'linux')
			return ''

		return new Promise<any>(async resolve => {
			await Promise.all([this.diskspace(), this.loadAverage(), this.memory(), this.uptime()]).then(result => {
				resolve(Object.assign({}, ...result));
			})
		})
	}

	diskspace() {
		return new Promise<any>(resolve => {
			exec("df / | tail -1 | awk '{print $3,$4}'", (err, stdout) => {
				if (err) {
					$log.error("Error running command:", err);
					return;
				}

				let split = stdout.replaceAll('\n', '').split(' ');
				let used = Number(split[0]) / 1000000
				let available = Number(split[1]) / 1000000
				let total = used + available;

				resolve({ diskspace: { used: Number(used.toFixed(2)), available: Number(available.toFixed(2)), total: Number(total.toFixed(2)) } })
			});
		});
	}

	memory() {
		return new Promise<any>(resolve => {
			fs.readFile("/proc/meminfo", "utf8", (err, data) => {
				if (err) {
					$log.error("Error reading /proc/meminfo:", err);
					return;
				}

				let lines = data.split('\n')
				let total = Number(lines.find(line => line.includes('MemTotal'))?.replaceAll(/\D/g, '')) / 1000000
				let available = Number(lines.find(line => line.includes('MemAvailable'))?.replaceAll(/\D/g, '')) / 1000000
				let used = total - available

				resolve({ memory: { used: Number(used.toFixed(2)), available: Number(available.toFixed(2)), total: Number(total.toFixed(2)) } })
			});
		})
	}

	loadAverage() {
		return new Promise<any>(resolve => {
			fs.readFile("/proc/loadavg", "utf8", (err, data) => {
				if (err) {
					$log.error("Error reading /proc/loadavg:", err);
					return;
				}

				resolve({ loadAverage: data.split(' ').slice(0, 3) })
			});
		})
	}

	uptime() {
		return new Promise<any>(resolve => {
			fs.readFile("/proc/uptime", "utf8", (err, data) => {
				if (err) {
					$log.error("Error reading /proc/uptime:", err);
					return;
				}

				resolve({ uptime: `${this.formatUptime(parseFloat(data.split(" ")[0]))}` })
			});
		})
	}

	formatUptime(seconds: number) {
		const days = Math.floor(seconds / (24 * 60 * 60));
		seconds %= 24 * 60 * 60;

		const hours = Math.floor(seconds / (60 * 60));
		seconds %= 60 * 60;

		const minutes = Math.floor(seconds / 60);
		seconds = Math.floor(seconds % 60);

		let format = (value: number, label: string) => value == 0 ? '' : `${value} ${label}${value == 1 ? '' : 's'}, `
		return `${format(days, 'day')}${format(hours, 'hour')}${format(minutes, 'minute')}${format(seconds, 'second')}`.replace(/, (?!.*, )/, "")
	}

}
