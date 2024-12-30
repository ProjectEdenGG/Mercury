import { Component } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	standalone: false,
})
export class HomeComponent {
	ip = 'projecteden.gg';

	copyIp() {
		navigator.clipboard.writeText(this.ip)
		// TODO Tooltip
	}

}
