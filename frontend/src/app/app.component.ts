import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './service/api.service';
import { Utils } from './utils/utils';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	standalone: false
})
export class AppComponent {
	private styleElement: any;

	constructor(
		public utils: Utils,
		public router: Router,
		public renderer: Renderer2,
		public apiService: ApiService,
	) {
		// TODO guard with canActivate until success
		this.apiService.getRanks().subscribe({
			next: (ranks: any) => {
				for (let rank of ranks) {
					let cssified = utils.asCssClass(rank.name);
					let variable = `--color-${cssified}`;
					this.createCssVariable(variable, rank.color);
					this.createCssClass(`.color-${cssified} { color: var(${variable}); }`)
					this.createCssClass(`.background-color-${cssified} { background-color: var(${variable}); }`)
				}
			}
		})
	}

	isHomePage() {
		return this.router.url.split(/[#?]/)[0] === '/'
	}

	createCssVariable(variable: string, value: any) {
		document.documentElement.style.setProperty(variable, value);
	}

	createCssClass(style: string) {
		if (!this.styleElement) {
			this.styleElement = this.renderer.createElement('style');
			this.renderer.appendChild(document.head, this.styleElement);
		}
		this.styleElement.textContent = this.styleElement.textContent + style;
	}
}
