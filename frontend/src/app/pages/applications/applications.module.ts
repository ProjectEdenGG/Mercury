import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsComponent } from './applications.component';
import { ApplicationsRoutingModule } from './applications-routing.module';

@NgModule({
	declarations: [ApplicationsComponent],
	imports: [
		CommonModule,
		ApplicationsRoutingModule,
	]
})
export class ApplicationsModule {
}
