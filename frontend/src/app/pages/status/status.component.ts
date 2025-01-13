import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Utils } from '../../utils/utils';
import { combineLatest } from 'rxjs';
import { ResponsiveUtil } from '../../utils/responsive-util.component';

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
				this.loading = false;
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

		this.intervalIds.push(setInterval(() => ++this.data.status.uptime, 1000))
	}

	ngOnDestroy() {
		this.intervalIds.forEach(id => clearInterval(id))
	}

	loadAverage() {
		return this.data.status.loadAverage.map((average: number) => average.toFixed(2))
	}

}
