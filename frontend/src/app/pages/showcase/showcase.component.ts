import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Utils } from '../../utils/utils';

@Component({
	selector: 'app-showcase',
	templateUrl: './showcase.component.html',
	styleUrl: './showcase.component.scss',
	standalone: false,
})
export class ShowcaseComponent {
	showcase: any;

	constructor(
		public utils: Utils,
		public apiService: ApiService,
	) {
		this.apiService.getShowcase().subscribe({
			next: result => this.showcase = result,
			error: () => this.showcase = null
		})
	}

}
