import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatedTableComponent } from './paginated-table.component';
import { NgbTooltip } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
	declarations: [PaginatedTableComponent],
	imports: [
		CommonModule,
		NgbTooltip,
	],
	exports: [PaginatedTableComponent]
})
export class PaginatedTableModule {}
