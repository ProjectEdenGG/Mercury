import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrl: './nav.component.scss',
	standalone: false,
})
export class NavComponent {
	@ViewChild('nav') nav: ElementRef;
	public open$: BehaviorSubject<boolean> = new BehaviorSubject(false);

	constructor(
		public router: Router,
	) {
		this.router.events.subscribe(e => {
			if (e instanceof NavigationEnd)
				this.open$.next(false)
		})
	}

	ngAfterViewInit() {
		this.open$.subscribe(open => {
			let classList = this.nav.nativeElement.classList;
			open ? classList.add('active') : classList.remove('active');
		})
	}

	toggleNav() {
		this.open$.next(!this.open$.value)
	}
}
