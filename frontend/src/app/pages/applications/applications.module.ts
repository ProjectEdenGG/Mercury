import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsComponent } from './applications.component';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationModule } from './application/application.module';

@NgModule({
	declarations: [ApplicationsComponent],
	imports: [
		CommonModule,
		ApplicationsRoutingModule,
		ApplicationModule,
	]
})
export class ApplicationsModule {
}
