import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
