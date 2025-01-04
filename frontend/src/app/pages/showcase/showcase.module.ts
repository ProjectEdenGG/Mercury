import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseComponent } from './showcase.component';
import { ShowcaseRoutingModule } from './showcase-routing.module';
import { HoverBrightnessDirective } from '../../directive/hover-brightness/hover-brightness.directive';

@NgModule({
	declarations: [ShowcaseComponent],
	imports: [
		CommonModule,
		ShowcaseRoutingModule,
		HoverBrightnessDirective,
	]
})
export class ShowcaseModule {
}
