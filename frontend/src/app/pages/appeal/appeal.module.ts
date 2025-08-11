import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppealComponent } from './appeal.component';
import { AppealRoutingModule } from './appeal-routing.module';
import { SpinnerModule } from "../../components/spinner/spinner.module";
import { ApplicationModule } from "../applications/application/application.module";

@NgModule({
	declarations: [AppealComponent],
	imports: [
		CommonModule,
		AppealRoutingModule,
		SpinnerModule,
		ApplicationModule,
	]
})
export class AppealModule {
}
