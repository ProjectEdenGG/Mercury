import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoteComponent } from './vote.component';
import { VoteRoutingModule } from './vote-routing.module';
import { HoverBrightnessDirective } from "../../directive/hover-brightness/hover-brightness.directive";

@NgModule({
	declarations: [VoteComponent],
	imports: [
		CommonModule,
		VoteRoutingModule,
		HoverBrightnessDirective,
	]
})
export class VoteModule {
}
