import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, skip } from 'rxjs';
import { ModalComponent, ModalOptions } from '../modal/modal.component';
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
	public loginModalOptions: ModalOptions

	public loginForm = new FormGroup({
		username: new FormControl('', [Validators.required, Validators.maxLength(16)]),
	})

	constructor(
		public utils: Utils,
		public router: Router,
		public renderer: Renderer2,
		public apiService: ApiService,
		public responsiveUtil: ResponsiveUtil,
	) {
		this.router.events.subscribe(e => {
			if (e instanceof NavigationEnd)
				this.open$.next(false)
		})
	}

	ngAfterViewInit() {
		let element = this.nav.nativeElement;
		let classList = element.classList;
		this.open$.subscribe(open => {
			if (open) {
				this.renderer.addClass(document.body, 'disable-scroll')
				classList.remove("d-none")
				classList.remove("d-md-flex")
				setTimeout(() => classList.add('active'))
			} else {
				this.renderer.removeClass(document.body, 'disable-scroll')
				classList.remove('active')
			}
		})

		this.renderer.listen(element, 'transitionend', () => {
			if (!this.open$.value) {
				classList.add("d-none")
				classList.add("d-md-flex")
			}
		})

		this.utils.openLoginModal$.pipe(skip(1)).subscribe({
			next: (options: ModalOptions) => {
				this.loginModalOptions = {
					centered: this.responsiveUtil.gte('md'),
					title: 'Log In',
					...options
				};

				this.loginModal.open(this.loginModalOptions)
			}
		})
	}

	toggleNav() {
		let open = !this.open$.value
		this.open$.next(open)
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
