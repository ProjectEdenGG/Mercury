import { Component, ElementRef, Inject, signal, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
import { ResponsiveUtil } from '../../utils/responsive-util.component';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrl: './nav.component.scss',
	standalone: false,
})
export class NavComponent {
	@ViewChild('nav') nav: ElementRef;
	@ViewChild('mapModal') mapModal: ModalComponent;

	public open$: BehaviorSubject<boolean> = new BehaviorSubject(false);

	constructor(
		public router: Router,
		public responsiveUtil: ResponsiveUtil,
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

	map() {
		if (this.responsiveUtil.gte('md'))
			this.mapModal.open({ windowClass: 'map-modal' })
		else
			this.newTab()
	}

	newTab() {
		window.open('https://map.projecteden.gg', '_blank')
	}
}
