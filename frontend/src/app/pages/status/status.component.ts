import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Utils } from '../../utils/utils';

@Component({
	selector: 'app-status',
	templateUrl: './status.component.html',
	styleUrl: './status.component.scss',
	standalone: false,
})
export class StatusComponent {
	public status: any = {};

	constructor(
		public utils: Utils,
		public apiService: ApiService,
	) {
		this.apiService.getServerStatus().subscribe({
			next: result => {
				console.log('result', result)
				return this.status = result;
			},
			error: () => this.status = null
		})
	}

}
