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
	players: number;
	versions: string;

	constructor(
		public apiService: ApiService,
	) {
		this.apiService.getServerPlayers().subscribe((result: any) => this.players = result.players)
		this.apiService.getServerVersions().subscribe((result: any) => this.versions = result.versions)
	}

	copyIp() {
		navigator.clipboard.writeText(this.ip)
		// TODO Tooltip
	}

}
