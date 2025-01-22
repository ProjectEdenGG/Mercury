import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseComponent } from './showcase.component';
import { ShowcaseRoutingModule } from './showcase-routing.module';
import { HoverBrightnessDirective } from '../../directive/hover-brightness/hover-brightness.directive';
import { SpinnerModule } from "../../components/spinner/spinner.module";
import { PluralPipe } from "../../pipes/plural-pipe";

@NgModule({
	declarations: [ShowcaseComponent],
	imports: [
		CommonModule,
		ShowcaseRoutingModule,
		HoverBrightnessDirective,
		SpinnerModule,
		PluralPipe,
	]
})
export class ShowcaseModule {
}
