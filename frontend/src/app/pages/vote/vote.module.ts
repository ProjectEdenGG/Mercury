import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoteComponent } from './vote.component';
import { VoteRoutingModule } from './vote-routing.module';
import { HoverBrightnessDirective } from "../../directive/hover-brightness/hover-brightness.directive";
import { SpinnerModule } from "../../components/spinner/spinner.module";
import { PaginatedTableModule } from "../../components/paginated-table/paginated-table.module";
import { ProgressBarModule } from '../../components/progress-bar/progress-bar.module';

@NgModule({
	declarations: [VoteComponent],
	imports: [
		CommonModule,
		VoteRoutingModule,
		HoverBrightnessDirective,
		SpinnerModule,
		PaginatedTableModule,
		ProgressBarModule,
	]
})
export class VoteModule {
}
