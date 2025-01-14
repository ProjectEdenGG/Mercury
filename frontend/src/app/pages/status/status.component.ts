import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Utils } from '../../utils/utils';
import { combineLatest } from 'rxjs';
import { ResponsiveUtil } from '../../utils/responsive-util.component';
import * as datefns from 'date-fns';

@Component({
	selector: 'app-status',
	templateUrl: './status.component.html',
	styleUrl: './status.component.scss',
	standalone: false,
})
export class StatusComponent {
	data: any = {}
	loading: boolean = true

	intervalIds: any[] = [];

	GB: number = 1024 ** 3;

	constructor(
		public utils: Utils,
		public apiService: ApiService,
		public responsiveUtil: ResponsiveUtil,
	) {
		combineLatest([this.apiService.getServerStatus(), this.apiService.getBackups()]).subscribe({
			next: result => {
				this.data.status = result[0];
				this.data.backups = result[1];
				console.log('data', this.data);
				this.formatData();
				this.loading = false;
				this.intervalIds.push(setInterval(() => ++this.data.status.uptime, 1000))
			},
			error: ex => {
				console.error(ex)
				this.loading = false;
			}
		})

		this.intervalIds.push(setInterval(() => {
			this.apiService.getServerStatus().subscribe({
				next: result => {
					this.data.status = result;
				},
				error: ex => {
					console.error(ex)
				}
			})
		}, 5000))

	}

	private formatData() {
		Object.values(this.data.backups.databases).forEach((backups: any) => this.formatTimestamps(backups))
		Object.values(this.data.backups.git).forEach((backups: any) => this.formatTimestamps(backups))
		this.formatTimestamps(this.data.backups.worlds);

		Object.values(this.data.backups.databases).forEach((backups: any) => {
			for (let backup of backups) {
				backup.size = (backup.size / 1024 ** 2).toFixed(2) + " MB";
			}
		})
	}

	formatTimestamps(backups: any[]) {
		for (let backup of backups) {
			// @ts-ignore
			backup.timestamp = new Date(backup.timestamp).toLocaleString() + " (" + this.utils.formatTimespan((Date.now() - new Date(backup.timestamp)) / 1000, 'short') + " ago)";
		}
	}

	ngOnDestroy() {
		this.intervalIds.forEach(id => clearInterval(id))
	}

	loadAverage() {
		return this.data.status.loadAverage.map((average: number) => average.toFixed(2))
	}

	date(timestamp: any, format?: string) {
		return datefns.format(new Date(timestamp), format)
	}
}
