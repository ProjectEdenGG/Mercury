import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './status.component';
import { StatusRoutingModule } from './status-routing.module';

@NgModule({
	declarations: [StatusComponent],
	imports: [
		CommonModule,
		StatusRoutingModule,
	]
})
export class StatusModule {
}
