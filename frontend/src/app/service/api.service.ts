import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ApiService {

	constructor(
		private http: HttpClient
	) { }

	timestamp() {
		return this.http.get('/api/timestamp');
	}

	getServerStatus() {
		return this.http.get('/api/status');
	}

	getBackups() {
		return this.http.get('/api/backups');
	}

	getShowcase() {
		return this.http.get('/api/showcase');
	}

	getMinecraftServerStatus() {
		return this.http.get('/nexus/status');
	}

	getVoteData() {
		return this.http.get('/nexus/votes');
	}

	getStaff() {
		return this.http.get('/nexus/staff');
	}

	getRanks() {
		return this.http.get('/nexus/ranks');
	}

	getDiversity() {
		return this.http.get('/nexus/diversity');
	}

	getNerd(username: string) {
		return this.http.get(`/nexus/nerd/${username}`);
	}

	getModrinthVersions(mod: string) {
		return this.http.get(`https://api.modrinth.com/v2/project/${mod}/version`);
	}

	getMinigameStats() {
		return this.http.get('/nexus/minigames/stats')
	}

	getMinigameStatsForStat(mechanic: string, stat_key: string, date: string, uuid: string) {
		return this.http.get(`/nexus/minigames/stats/leaderboard/${mechanic}/${stat_key}/${date}/${uuid}`)
	}

	getMinigameAggregateStats(mechanic: string, date: string, uuid: string) {
		return this.http.get(`/nexus/minigames/stats/aggregate/${mechanic}/${date}/${uuid}`)
	}

}
