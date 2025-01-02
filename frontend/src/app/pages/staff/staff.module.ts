import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { StaffRoutingModule } from './staff-routing.module';
import { AppModule } from '../../app.module';
import { ModalModule } from '../../components/modal/modal.module';

@NgModule({
	declarations: [StaffComponent],
	imports: [
		CommonModule,
		StaffRoutingModule,
	]
})
export class StaffModule {
}
