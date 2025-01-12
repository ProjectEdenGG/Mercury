import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { StaffRoutingModule } from './staff-routing.module';
import { TwemojiPipe } from '../../pipes/twemoji-pipe';
import { SpinnerModule } from '../../components/spinner/spinner.module';

@NgModule({
	declarations: [StaffComponent],
	imports: [
		CommonModule,
		StaffRoutingModule,
		TwemojiPipe,
		SpinnerModule,
	]
})
export class StaffModule {
}
