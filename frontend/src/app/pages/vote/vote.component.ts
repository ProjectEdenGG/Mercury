import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
	selector: 'app-vote',
	templateUrl: './vote.component.html',
	styleUrl: './vote.component.scss',
	standalone: false,
})
export class VoteComponent {
	voteData: any
	loading: boolean = true

	headers = { name: { name: 'Name' }, count: { name: 'Votes', classes: 'text-end' } };

	constructor(
		public apiService: ApiService,
	) {
		this.apiService.getVoteData().subscribe({
			next: result => {
				this.voteData = result;
				console.log('voteData', this.voteData)
				this.loading = false;
			},
			error: ex => {
				console.error(ex)
				this.loading = false;
			}
		})
	}

}
