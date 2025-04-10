import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { Utils } from '../../utils/utils';

@Component({
	selector: 'paginated-table',
	templateUrl: './paginated-table.component.html',
	styleUrl: './paginated-table.component.scss',
	standalone: false,
})
export class PaginatedTableComponent {
	@Input() title: string
	@Input() headers: { [key: string]: any } = {}
	@Input() rows: any[]
	@Input() perPage: number = 5
	@Input() ranked: boolean

	@ViewChild('tableContainer') tableContainer: ElementRef

	currentPage: number = 1
	height: number;

	constructor(
		public utils: Utils,
		public renderer: Renderer2,
	) {}

	get paginatedRows() {
		const startIndex = (this.currentPage - 1) * this.perPage
		return this.rows.slice(startIndex, startIndex + this.perPage)
	}

	changePage(page: number) {
		this.currentPage = page
		this.setFixedHeight();
	}

	setFixedHeight() {
		if (!this.height) {
			this.height = this.tableContainer.nativeElement.offsetHeight;
			this.renderer.setStyle(this.tableContainer.nativeElement, 'height', `${this.height}px`);
		}
	}

	firstPage() {
		return this.currentPage === 1
	}

	lastPage() {
		return this.currentPage === Math.ceil(this.rows.length / this.perPage)
	}

	getRank(i: number) {
		return this.perPage * (this.currentPage - 1) + i + 1;
	}
}
