import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { HoverBrightnessDirective } from '../../../directive/hover-brightness/hover-brightness.directive';

@NgModule({
	declarations: [ApplicationComponent],
	exports: [
		ApplicationComponent
	],
	imports: [
		CommonModule,
		ApplicationRoutingModule,
		HoverBrightnessDirective,
	]
})
export class ApplicationModule {
}
