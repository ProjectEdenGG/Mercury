import {Component} from '@angular/core';
import {MercuryComponent} from '../../lifecycle/MercuryComponent';
import {Utils} from '../../utils/utils';
import {ApiService} from '../../service/api.service';


type Stat = {
	stats: { [key:string]: string },
	mechanic: string,
	title: string
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
	selector: 'app-minigames',
	templateUrl: './minigames.component.html',
	styleUrl: './minigames.component.scss',
	standalone: false
})
export class MinigamesComponent extends MercuryComponent {

	constructor(
		public utils: Utils,
		public apiService: ApiService,
	) {
		super()
	}

	stats: Stat[];
	mechanics: { [key:string]: string } = {}
	statisticsEntries: { [key:string]: string }
	dateRanges = {
		"all": "All Time",
		"last_7": "Last 7 Days",
		"last_30": "Last 30 Days",
		"last_365": "Last 365 Days"
	}

	selectedMechanic: string | undefined;
	selectedStatistic: string | undefined;
	selectedDateRange: string = Object.keys(this.dateRanges)[0];

	tableData: any = []

	override ngOnInit() {
		this.fetchPicklistData();
		this.utils.nerd$.subscribe({
			next: () => {
				this.onChangeStatistic()
			}
		})
	}

	fetchPicklistData() {
		this.apiService.getMinigameStats().subscribe({
			next: value => {
				this.stats = value as Stat[];
				console.log(value)
				for (let stat of this.stats) {
					this.mechanics[stat.mechanic] = stat.title
				}

				this.selectedMechanic = Object.keys(this.mechanics).sort((a,b) => a.localeCompare(b))[0];
				this.onChangeMechanic();
			}
		});
	}

	public onChangeSelectedMechanic(event: any) {
		this.selectedMechanic = event.target.value;
		this.onChangeMechanic();
	}

	onChangeMechanic() {
		let stat: Stat
		for (let _stat of this.stats) {
			if (_stat.mechanic == this.selectedMechanic) {
				stat = _stat;
				break;
			}
		}
		this.statisticsEntries = stat.stats;
		this.selectedStatistic = Object.keys(this.statisticsEntries).sort((a, b) => a.localeCompare(b))[0];
		this.onChangeStatistic()
	}

	public onChangeSelectedDateRange(event: any) {
		this.selectedDateRange = event.target.value;
		this.onChangeStatistic()
	}

	public onChangeSelectedStatistic(event: any) {
		this.selectedStatistic = event.target.value;
		this.onChangeStatistic();
	}

	onChangeStatistic() {
		let date: any = null;
		if (this.selectedDateRange != "all") {
			let days = parseInt(this.selectedDateRange.replace("last_", ""));
			date = new Date()
			date.setDate(date.getDate() - days);
			date = date.toISOString()
		}
		let uuid = this.utils.nerd?.uuid ?? null;
		this.apiService.getMinigameStatsForStat(this.selectedMechanic, this.selectedStatistic, date, uuid).subscribe({
			next: (value: any) => {
				this.tableData = Object.keys(value).map((key: any) => ({
					col1: `${value[key].rank} - ${value[key].name}`,
					col2: value[key].score
				}));
			}
		})
	}
}
