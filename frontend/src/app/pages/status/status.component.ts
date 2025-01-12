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
	status: any
	loading: boolean = true

	constructor(
		public utils: Utils,
		public apiService: ApiService,
	) {
		this.apiService.getServerStatus().subscribe({
			next: result => {
				this.status = result;
				this.loading = false;
			},
			error: ex => {
				console.error(ex)
				this.loading = false;
			}
		})
	}

}
