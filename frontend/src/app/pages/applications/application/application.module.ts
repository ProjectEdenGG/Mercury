import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { HoverBrightnessDirective } from '../../../directive/hover-brightness/hover-brightness.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressBarModule } from '../../../components/progress-bar/progress-bar.module';
import { LoadingButtonModule } from '../../../components/loading-button/loading-button.module';

@NgModule({
	declarations: [ApplicationComponent],
	exports: [
		ApplicationComponent
	],
	imports: [
		CommonModule,
		ApplicationRoutingModule,
		HoverBrightnessDirective,
		ReactiveFormsModule,
		ProgressBarModule,
		LoadingButtonModule,
	]
})
export class ApplicationModule {
}
