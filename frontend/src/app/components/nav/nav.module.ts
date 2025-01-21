import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import { RouterLink } from "@angular/router";
import { ModalModule } from "../modal/modal.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoadingButtonModule } from '../loading-button/loading-button.module';
import { FormMessageModule } from "../form-message/form-message.module";
import { CmsImagePipe } from "../../pipes/cms-pipe";

@NgModule({
	declarations: [NavComponent],
	imports: [
		CommonModule,
		RouterLink,
		ModalModule,
		FormsModule,
		LoadingButtonModule,
		ReactiveFormsModule,
		FormMessageModule,
		CmsImagePipe,
	],
	exports: [NavComponent]
})
export class NavModule {}
