import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	standalone: false,
})
export class HomeComponent {
	ip = 'projecteden.gg';
	status: any = {};

	constructor(
		public apiService: ApiService,
	) {
		this.apiService.getMinecraftServerStatus().subscribe({
			next: (result: any) => this.status = result,
			error: () => this.status = null
		})
	}

	copyIp() {
		navigator.clipboard.writeText(this.ip)
		// TODO Tooltip
	}

}
