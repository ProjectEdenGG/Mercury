import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	standalone: false
})
export class AppComponent {
	constructor(
		public router: Router,
	) { }

	isHomePage() {
		return this.router.url.startsWith('/home')
	}
}
