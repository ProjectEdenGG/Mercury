import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Utils } from '../../utils/utils';
import { combineLatest } from 'rxjs';
import { ResponsiveUtil } from '../../utils/responsive-util.component';
import { MercuryComponent } from '../../lifecycle/MercuryComponent';

@Component({
	selector: 'app-status',
	templateUrl: './status.component.html',
	styleUrl: './status.component.scss',
	standalone: false,
})
export class StatusComponent extends MercuryComponent {
	data: any = {}
	loading: boolean = true

	GB: number = 1024 ** 3;

	constructor(
		public utils: Utils,
		public apiService: ApiService,
		public responsiveUtil: ResponsiveUtil,
	) {
		super()

		combineLatest([this.apiService.getServerStatus(), this.apiService.getBackups()]).subscribe({
			next: result => {
				this.data.status = result[0];
				this.data.backups = result[1];
				console.log('data', this.data);
				this.formatData();
				this.loading = false;
				this.repeat(1000, () => ++this.data.status.uptime)
			},
			error: ex => {
				console.error(ex)
				this.loading = false;
			}
		})

		this.repeat(5000, () => {
			this.apiService.getServerStatus().subscribe({
				next: result => {
					this.data.status = result;
				},
				error: ex => {
					console.error(ex)
				}
			})
		})
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
			let timestamp: string = backup.timestamp;
			backup.timestamp = {}
			backup.timestamp.tooltip = new Date(timestamp).toLocaleString()
			let ago = this.utils.formatTimespan((Date.now() - new Date(timestamp).valueOf()) / 1000, 'short', ['second', 'minute']);
			backup.timestamp.text = ago ? ago + ' ago' : 'now'
		}
	}

	loadAverage() {
		return this.data.status.loadAverage.map((average: number) => average.toFixed(2))
	}
}
