import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrl: './nav.component.scss',
	standalone: false,
})
export class NavComponent {
	@ViewChild('nav') nav: ElementRef;
	navIcon: 'list' | 'x' = 'list';

	toggleNav() {
		this.navIcon = this.nav.nativeElement.classList.toggle('active') ? 'x' : 'list';
	}
}
