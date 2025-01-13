import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatedTableComponent } from './paginated-table.component';

@NgModule({
	declarations: [PaginatedTableComponent],
	imports: [
		CommonModule,
	],
	exports: [PaginatedTableComponent]
})
export class PaginatedTableModule {}
