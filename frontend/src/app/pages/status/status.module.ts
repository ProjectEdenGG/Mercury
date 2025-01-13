import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './status.component';
import { StatusRoutingModule } from './status-routing.module';
import { SpinnerModule } from "../../components/spinner/spinner.module";
import { ProgressBarModule } from '../../components/progress-bar/progress-bar.module';
import { PaginatedTableModule } from "../../components/paginated-table/paginated-table.module";

@NgModule({
	declarations: [StatusComponent],
	imports: [
		CommonModule,
		StatusRoutingModule,
		SpinnerModule,
		ProgressBarModule,
		PaginatedTableModule,
	]
})
export class StatusModule {
}
