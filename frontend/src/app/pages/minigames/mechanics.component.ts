import {Component} from '@angular/core';
import {MercuryComponent} from '../../lifecycle/MercuryComponent';
import {Utils} from '../../utils/utils';
import {ApiService} from '../../service/api.service';


type Stat = {
	mechanic: string,
	title: string,
	description: string,
	group: string
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
	groups: string[] = [];
	enabledGroups: string[] = [];

	override ngOnInit() {
		this.fetchMechanics();
	}

	fetchMechanics() {
		this.apiService.getMinigameStats().subscribe({
			next: value => {
				this.stats = value as Stat[];
				this.groups = [...new Set(this.stats.map(stat => stat.group))];
			}
		});
	}

	getMechanicTitle(mechanic: any): string {
		return mechanic.title
			.replace('Four Team Deathmatch', 'Four Team<br class="d-none d-sm-block"/> Deathmatch')
	}

	toggleGroup(group: string) {
		if (this.enabledGroups.includes(group))
			this.enabledGroups = this.enabledGroups.filter(_group => _group !== group)
		else
			this.enabledGroups.push(group)
	}
}
