import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Utils } from '../../utils/utils';

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
	intervalIds: any[] = [];

	constructor(
		public utils: Utils,
		public apiService: ApiService,
	) {
		let update = () => {
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

		update();
		this.intervalIds.push(setInterval(() => update(), 5000))
	}

	ngOnDestroy() {
		this.intervalIds.forEach(id => clearInterval(id))
	}

	replaceUsername(value: any) {
		return value.replaceAll("{{USERNAME}}", this.utils.nerd.username)
	}

	hasVoted(site: any) {
		return this.voteData.activeVotes[this.utils.nerd?.uuid]?.includes(site.id);
	}
}
