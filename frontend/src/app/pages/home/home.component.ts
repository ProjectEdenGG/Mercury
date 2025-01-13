import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	standalone: false,
})
export class HomeComponent {
	ip = 'projecteden.gg'

	status: any
	loading: boolean = true
	offline: boolean

	constructor(
		public apiService: ApiService,
	) {
		this.apiService.getMinecraftServerStatus().subscribe({
			next: result => {
				this.status = result;
				this.loading = false;
			},
			error: ex => {
				console.error(ex)
				this.offline = true;
				this.loading = false;
			}
		})
	}

	copyIp() {
		navigator.clipboard.writeText(this.ip)
		// TODO Tooltip
	}

	loadedStatus() {
		return 'players' in this.status
	}
}
