import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Utils } from '../utils/utils';

@Injectable({providedIn: 'root'})
export class ApiService {

	constructor(
		private utils: Utils,
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

	getApplications() {
		return this.http.get('/api/applications');
	}

	uploadImage(formData: FormData) {
		return this.http.post('/api/image/upload', formData);
	}

	submitApplication(id: string, answers: any) {
		return this.http.post(`/api/applications/submit/${id}`, { nerd: this.utils.nerd ?? { nickname: answers.username }, answers });
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

	getMinigameStatsForStat(mechanic: string, stat_key: string, date: string, uuid: string, page: number) {
		return this.http.post('/nexus/minigames/stats', {
			"mechanic": mechanic,
			"stat": stat_key,
			"date": date,
			"uuid": uuid,
			"page": page
		})
	}

	getMinigameAggregateStats(mechanic: string, date: string, uuid: string) {
		return this.http.post('/nexus/minigames/stats/aggregate', {
			"mechanic": mechanic,
			"date": date,
			"uuid": uuid
		})
	}

}
