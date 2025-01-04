import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import { RouterLink } from "@angular/router";
import { ModalModule } from "../modal/modal.module";

@NgModule({
	declarations: [NavComponent],
	imports: [
		CommonModule,
		RouterLink,
		ModalModule,
	],
	exports: [NavComponent]
})
export class NavModule {}
