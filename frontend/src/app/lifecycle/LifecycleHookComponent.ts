import { AfterContentInit, AfterViewInit, Component, OnChanges, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { Utils } from '../utils/utils';

@Component({ standalone: true, template: '' })
export class LifecycleHookComponent implements OnChanges, OnInit, AfterContentInit, AfterViewInit, OnDestroy {
	public component: any
	public isRouteComponent: boolean

	public onInit: boolean
	public afterViewInit: boolean
	public afterContentInit: boolean
	public onDestroy: boolean

	public unsubscriber$: Subject<void> = new Subject<void>()
	public intervalIds: number[] = []

	constructor(
		public utils: Utils,
		public router: Router,
		public route: ActivatedRoute,
	) { }

	private name() {
		return this.component.constructor.name.substring(1)
	}

	private id() {
		return this.component.constructor['__NG_ELEMENT_ID__']
	}

	private debug(...obj: any[]) {
		// if (this.name()?.includes('Component'))
		// 	console.log(`LifecycleHook(${this.name()})`, ...obj, this.component)
	}

	ngOnChanges(): void {
		setTimeout(() => {
			this.debug(`OnChanges`)
		})
	}

	ngOnInit(): void {
		setTimeout(() => {
			this.debug(`OnInit`)
			this.onInit = true

			this.isRouteComponent = this.route.component.prototype.constructor['__NG_ELEMENT_ID__'] == this.id()
			if (this.isRouteComponent)
				this.debug(`isRouteComponent`)
		})
	}

	ngAfterContentInit(): void {
		setTimeout(() => {
			this.debug(`AfterContentInit`)
			this.afterContentInit = true
		})
	}

	ngAfterViewInit(): void {
		setTimeout(() => {
			this.debug(`AfterViewInit`)
			this.afterViewInit = true
		})
	}

	ngOnDestroy(): void {
		setTimeout(() => {
			this.debug(`OnDestroy`)
			this.onDestroy = true
			this.unsubscriber$.next(null);
			this.unsubscriber$.complete();
			this.intervalIds.forEach(id => clearInterval(id))
		})
	}

}
