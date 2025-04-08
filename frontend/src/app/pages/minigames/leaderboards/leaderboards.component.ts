import {Component} from '@angular/core';
import {MercuryComponent} from '../../../lifecycle/MercuryComponent';
import {Utils} from '../../../utils/utils';
import {ApiService} from '../../../service/api.service';
import {ActivatedRoute} from '@angular/router';


type Stat = {
	stats: { [key:string]: string },
	mechanic: string,
	title: string,
	description: string,
	timed: boolean
}

// {
//     "stats": {
//         "wins": "Wins",
//         "arrows_fired": "Arrows Fired",
//         "targets_hit": "Targets Hit",
//         "time_played": "Time Played"
//     },
//     "mechanic": "archery",
//     "title": "Archery",
// 	   "description": "...",
//     "timed": false
// }

@Component({
	selector: 'app-minigames-leaderboards',
	templateUrl: './leaderboards.component.html',
	styleUrl: './leaderboards.component.scss',
	standalone: false
})
export class LeaderboardsComponent extends MercuryComponent {

	constructor(
		public utils: Utils,
		public apiService: ApiService,
		private route: ActivatedRoute
	) {
		super()
	}

	stats: Stat[];
	mechanics: { [key:string]: string } = {}
	descriptions: { [key:string]: string } = {}
	statisticsEntries: { [key:string]: string }
	dateRanges = {
		"all": "All Time",
		"last_7": "Weekly",
		"last_30": "Monthly",
		"last_365": "Yearly"
	};
	globalStats: any = []
	userAggregateStats: any = []

	timedLeaderboard: boolean = false

	selectedMechanic: string | undefined;
	selectedStatistic: string | undefined;
	selectedDateRange: string = Object.keys(this.dateRanges)[0];

	tableData: any = []

	override ngOnInit() {
		this.route.paramMap.subscribe(params => {
			console.log(params)
			this.selectedMechanic = params.get('mechanic');
			this.fetchPicklistData();
		});

		this.utils.nerd$.subscribe({
			next: () => {
				this.onChangeStatistic()
			}
		})
	}

	get dateRangeEntries() {
		return Object.entries(this.dateRanges).map(([key, value]) => ({ key, value }));
	}

	onClickDateRange(key: string) {
		this.selectedDateRange = key;
		this.onChangeStatistic();
	}

	getButtonClass(key: string, index: number) {
		const total = this.dateRangeEntries.length;
		return {
			'btn': true,
			'btn-outline-primary': key !== this.selectedDateRange,
			'btn-primary': key === this.selectedDateRange,
			'custom-rounded-start': index === 0,
			'custom-rounded-none': index > 0 && index < total - 1,
			'custom-rounded-end': index === total - 1
		};
	}

	fetchPicklistData() {
		this.apiService.getMinigameStats().subscribe({
			next: value => {
				this.stats = value as Stat[];
				for (let stat of this.stats) {
					this.mechanics[stat.mechanic] = stat.title
					this.descriptions[stat.mechanic] = stat.description;
				}

				this.onChangeMechanic();
			}
		});
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
		this.timedLeaderboard = stat.timed;
		this.selectedStatistic = Object.keys(this.statisticsEntries).sort((a, b) => a.localeCompare(b))[0];
		if ("wins" in this.statisticsEntries)
			this.selectedStatistic = "wins"

		this.onChangeStatistic()
	}

	public onChangeSelectedStatistic(event: any) {
		this.selectedStatistic = event.target.value;
		this.onChangeStatistic();
	}

	onChangeStatistic() {
		if (this.selectedStatistic == undefined || this.selectedMechanic == undefined)
			return
		let date: any = null;
		if (this.selectedDateRange != "all") {
			let days = parseInt(this.selectedDateRange.replace("last_", ""));
			date = new Date()
			date.setDate(date.getDate() - days);
			date = date.toISOString()
		}
		let uuid = this.utils.nerd?.uuid ?? null;
		this.apiService.getMinigameStatsForStat(this.selectedMechanic, this.selectedStatistic, date, uuid, this.currentPage).subscribe({
			next: (value: any) => {
				this.tableData = value.leaderboard;
				this.totalRows = value.totalRows;
				if (value.self) {
					this.tableData.push(value.self);
					this.tableData.splice(-1, 0, { rank: "Your ranking:" });
				}
			}
		})

		if (!this.timedLeaderboard) {
			this.apiService.getMinigameAggregateStats(this.selectedMechanic, date, null).subscribe({
				next: (value: any) => {
					this.globalStats = Object.keys(value).map((key: any) => ({
						stat: value[key].stat,
						value: value[key].value
					})).sort((a, b) => a.stat.localeCompare(b.stat));
				}
			})
		}
		if (this.utils.nerd?.uuid) {
			this.apiService.getMinigameAggregateStats(this.selectedMechanic, date, this.utils.nerd.uuid).subscribe({
				next: (value: any) => {
					this.userAggregateStats = Object.keys(value).map((key: any) => ({
						stat: value[key].stat,
						value: value[key].value
					})).sort((a, b) => a.stat.localeCompare(b.stat));
				}
			})
		}
		else {
			this.userAggregateStats = []
		}
	}

	currentPage: number = 1
	totalRows: number = 0

	changePage(page: number) {
		this.currentPage = page
		this.onChangeStatistic()
	}

	firstPage() {
		return this.currentPage === 1
	}

	lastPage() {
		return this.currentPage === Math.ceil(this.totalRows / 10)
	}

}
