import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsComponent } from './applications.component';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationLinkModule } from './application-link/application-link.module';

@NgModule({
	declarations: [ApplicationsComponent],
	exports: [
		ApplicationsComponent
	],
	imports: [
		CommonModule,
		ApplicationsRoutingModule,
		ApplicationLinkModule,
	]
})
export class ApplicationsModule {
}
