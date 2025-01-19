import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, DoCheck, inject, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewContainerRef } from "@angular/core";
import { LifecycleHookComponent } from "./LifecycleHookComponent";

@Component({template: ''})
export abstract class MercuryComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
	private resolver: ComponentFactoryResolver = inject(ComponentFactoryResolver);
	private viewContainerRef: ViewContainerRef = inject(ViewContainerRef);

	private lifecycleComponentRef: ComponentRef<LifecycleHookComponent>;

	protected constructor() {
		const lifecycleComponent = this.resolver.resolveComponentFactory(LifecycleHookComponent);
		this.viewContainerRef.clear();
		this.lifecycleComponentRef = this.viewContainerRef.createComponent(lifecycleComponent);
		this.lifecycle().component = this;
	}

	lifecycle() {
		return this.lifecycleComponentRef.instance
	}

	repeat(interval: number, runnable: TimerHandler) {
		this.lifecycle().intervalIds.push(setInterval(runnable, interval));
	}

	// Don't modify - code will get overridden

	ngOnChanges(changes: SimpleChanges): void {}
	ngOnInit(): void {}
	ngDoCheck(): void {}
	ngAfterContentInit(): void {}
	ngAfterContentChecked(): void {}
	ngAfterViewInit(): void {}
	ngAfterViewChecked(): void {}
	ngOnDestroy(): void {}
}
