import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseComponent } from './showcase.component';
import { ShowcaseRoutingModule } from './showcase-routing.module';
import { HoverBrightnessDirective } from '../../directive/hover-brightness/hover-brightness.directive';
import { SpinnerModule } from "../../components/spinner/spinner.module";

@NgModule({
	declarations: [ShowcaseComponent],
	imports: [
		CommonModule,
		ShowcaseRoutingModule,
		HoverBrightnessDirective,
		SpinnerModule,
	]
})
export class ShowcaseModule {
}
