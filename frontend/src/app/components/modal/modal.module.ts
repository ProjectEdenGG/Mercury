import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { HoverBrightnessDirective } from "../../directive/hover-brightness/hover-brightness.directive";

@NgModule({
	declarations: [ModalComponent],
	imports: [
		CommonModule,
		HoverBrightnessDirective,
	],
	exports: [ModalComponent]
})
export class ModalModule {
}
