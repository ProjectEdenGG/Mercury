import { Injectable } from "@tsed/di";
import os from 'node:os';
import * as si from 'systeminformation';

@Injectable()
export class SystemService {
	cpuUsage: number = 0;

	constructor() {
		let oldSample = this.sampleCPUUsage();

		setInterval(() => {
			const newSample = this.sampleCPUUsage();

			const totalUsage = oldSample.reduce((acc, oldStat, index) => {
				const oldCPU = oldStat;
				const newCPU = newSample[index];
				const cpuPercentage = this.calculateCPUPercentage(oldCPU, newCPU);
				return acc + cpuPercentage;
			}, 0);

			this.cpuUsage = Number((totalUsage / oldSample.length).toFixed(2));
			oldSample = newSample;
		}, 1000);
	}

	calculateCPUPercentage(oldStats: any, newStats: any) {
		const oldIdle = oldStats.idle;
		const oldTotal = oldStats.total;

		const newIdle = newStats.idle;
		const newTotal = newStats.total;

		const idleDifference = newIdle - oldIdle;
		const totalDifference = newTotal - oldTotal;

		return (1 - idleDifference / totalDifference) * 100;
	}

	sampleCPUUsage() {
		return os.cpus().map(cpu => {
			const { user, nice, sys, idle, irq } = cpu.times;
			return {
				total: user + nice + sys + idle + irq,
				idle: idle,
			};
		});
	}

	diskspace() {
		return new Promise<any>(async resolve => {
			si.fsSize(os.platform() === 'win32' ? 'C:' : '/dev/md2').then((result: any) => {
				resolve({
					total: result[0].size,
					used: result[0].used,
					free: result[0].available,
					percentage: (result[0].used / result[0].size) * 100,
				})
			})
		});
	}

}
