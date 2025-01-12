import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoteComponent } from './vote.component';
import { VoteRoutingModule } from './vote-routing.module';
import { HoverBrightnessDirective } from "../../directive/hover-brightness/hover-brightness.directive";
import { SpinnerModule } from "../../components/spinner/spinner.module";

@NgModule({
	declarations: [VoteComponent],
	imports: [
		CommonModule,
		VoteRoutingModule,
		HoverBrightnessDirective,
		SpinnerModule,
	]
})
export class VoteModule {
}
