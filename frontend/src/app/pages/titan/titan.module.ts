import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitanComponent } from './titan.component';
import { TitanRoutingModule } from './titan-routing.module';
import { HoverBrightnessDirective } from "../../directive/hover-brightness/hover-brightness.directive";

@NgModule({
	declarations: [TitanComponent],
	imports: [
		CommonModule,
		TitanRoutingModule,
		HoverBrightnessDirective,
	]
})
export class TitanModule {
}
