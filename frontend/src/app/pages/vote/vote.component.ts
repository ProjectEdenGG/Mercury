import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
	selector: 'app-vote',
	templateUrl: './vote.component.html',
	styleUrl: './vote.component.scss',
	standalone: false,
})
export class VoteComponent {
	sites: any = {};

	constructor(
		public apiService: ApiService,
	) {
		this.apiService.getVoteSites().subscribe(result => this.sites = result);
	}

}
