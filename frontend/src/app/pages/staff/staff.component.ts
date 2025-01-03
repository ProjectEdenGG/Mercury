import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Utils } from '../../utils/utils';

@Component({
	selector: 'app-staff',
	templateUrl: './staff.component.html',
	styleUrl: './staff.component.scss',
	standalone: false,
})
export class StaffComponent {
	public staff: any = [];

	constructor(
		public utils: Utils,
		public apiService: ApiService,
	) {
		this.apiService.getStaff().subscribe({
			next: result => this.staff = result,
			error: () => this.staff = null
		})
	}
}
