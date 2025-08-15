import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationLinkComponent } from './application-link.component';
import { HoverBrightnessDirective } from '../../../directive/hover-brightness/hover-brightness.directive';
import { RouterLink } from '@angular/router';

@NgModule({
	declarations: [ApplicationLinkComponent],
	exports: [
		ApplicationLinkComponent
	],
	imports: [
		CommonModule,
		HoverBrightnessDirective,
		RouterLink,
	]
})
export class ApplicationLinkModule {
}
