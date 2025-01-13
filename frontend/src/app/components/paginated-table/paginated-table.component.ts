import { Component, Input } from '@angular/core';
import { Utils } from '../../utils/utils';

@Component({
	selector: 'paginated-table',
	templateUrl: './paginated-table.component.html',
	styleUrl: './paginated-table.component.scss',
	standalone: false,
})
export class PaginatedTableComponent {
	@Input() title: string
	@Input() headers: { [key: string]: string } = {}
	@Input() rows: any[]
	@Input() perPage: number = 5

	currentPage: number = 1

	constructor(public utils: Utils) {}

	get paginatedRows() {
		const startIndex = (this.currentPage - 1) * this.perPage
		return this.rows.slice(startIndex, startIndex + this.perPage)
	}

	changePage(page: number) {
		this.currentPage = page
	}

	protected readonly Math = Math

	firstPage() {
		return this.currentPage === 1
	}

	lastPage() {
		return this.currentPage === Math.ceil(this.rows.length / this.perPage)
	}

}
