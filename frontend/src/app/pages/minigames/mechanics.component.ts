import {Component} from '@angular/core';
import {MercuryComponent} from '../../lifecycle/MercuryComponent';
import {Utils} from '../../utils/utils';
import {ApiService} from '../../service/api.service';


type Stat = {
	mechanic: string,
	title: string,
	description: string,
	imageURL: string,
	imageOffset: number
}

// {
//     "stats": {
//         "wins": "Wins",
//         "arrows_fired": "Arrows Fired",
//         "targets_hit": "Targets Hit",
//         "time_played": "Time Played"
//     },
//     "mechanic": "archery",
//     "title": "Archery"
// }

@Component({
	selector: 'app-minigames-mechanics',
	templateUrl: './mechanics.component.html',
	styleUrl: './mechanics.component.scss',
	standalone: false
})
export class MechanicsComponent extends MercuryComponent {

	constructor(
		public utils: Utils,
		public apiService: ApiService
	) {
		super()
	}

	stats: Stat[];
	mechanics: { [key:string]: string } = {}
	descriptions: { [key:string]: string } = {}

	override ngOnInit() {
		this.fetchPicklistData();
	}

	fetchPicklistData() {
		this.apiService.getMinigameStats().subscribe({
			next: value => {
				this.stats = value as Stat[];
			}
		});
	}

}
