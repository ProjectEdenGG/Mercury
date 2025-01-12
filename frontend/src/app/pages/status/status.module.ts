import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './status.component';
import { StatusRoutingModule } from './status-routing.module';
import { SpinnerModule } from "../../components/spinner/spinner.module";

@NgModule({
	declarations: [StatusComponent],
	imports: [
		CommonModule,
		StatusRoutingModule,
		SpinnerModule,
	]
})
export class StatusModule {
}
