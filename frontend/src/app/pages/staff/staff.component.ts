import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Utils } from '../../utils/utils';
import { MercuryComponent } from '../../lifecycle/MercuryComponent';

@Component({
	selector: 'app-staff',
	templateUrl: './staff.component.html',
	styleUrl: './staff.component.scss',
	standalone: false,
})
export class StaffComponent extends MercuryComponent {
	staff: any
	loading: boolean = true

	constructor(
		public utils: Utils,
		public apiService: ApiService,
	) {
		super()

		this.apiService.getStaff().subscribe({
			next: result => {
				this.staff = result;
				this.loading = false
			},
			error: ex => {
				console.error(ex)
				this.loading = false
			}
		})
	}

	fadeIn(event: any) {
		event.target?.classList?.remove('d-none')
		event.target?.classList?.add('fade-in')
	}

}
