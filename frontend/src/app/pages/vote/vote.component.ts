import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
	selector: 'app-vote',
	templateUrl: './vote.component.html',
	styleUrl: './vote.component.scss',
	standalone: false,
})
export class VoteComponent {
	sites: any
	loading: boolean = true

	constructor(
		public apiService: ApiService,
	) {
		this.apiService.getVoteSites().subscribe({
			next: result => {
				this.sites = result;
				this.loading = false;
			},
			error: ex => {
				console.error(ex)
				this.loading = false;
			}
		})
	}

}
