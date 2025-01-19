import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
import { ResponsiveUtil } from '../../utils/responsive-util.component';
import { Nerd, Utils } from '../../utils/utils';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { FormMessage } from '../../utils/form-util';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrl: './nav.component.scss',
	standalone: false,
})
export class NavComponent {
	@ViewChild('nav') nav: ElementRef;
	@ViewChild('loginModal') loginModal: ModalComponent;
	@ViewChild('mapModal') mapModal: ModalComponent;

	public open$: BehaviorSubject<boolean> = new BehaviorSubject(false);

	public loginFormLoading: boolean;
	public loginFormMessage: FormMessage;

	public loginForm = new FormGroup({
		username: new FormControl('', [Validators.required, Validators.maxLength(16)]),
	})

	constructor(
		public utils: Utils,
		public router: Router,
		public apiService: ApiService,
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

		this.utils.openLoginModal$.subscribe(() => this.loginModal.open())
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

	login() {
		this.loginFormMessage = null
		this.loginFormLoading = false

		if (this.loginForm.invalid) {
			console.log("invalid", this.loginForm.value)
		} else {
			this.loginFormLoading = true;
			this.apiService.getNerd(this.loginForm.value.username).subscribe({
				next: (response: any) => {
					this.utils.nerd = response as Nerd;
					this.loginFormLoading = false;
					this.loginModal.close();
				},
				error: ex => {
					console.error(ex);
					this.loginFormLoading = false;
					this.loginFormMessage = { type: 'danger', message: 'Player not found' }
					this.loginForm.controls.username.setErrors({"username": false})
				}
			})
		}
	}

	logout() {
		this.utils.nerd = null
		this.loginForm.controls.username.patchValue('')
	}
}
