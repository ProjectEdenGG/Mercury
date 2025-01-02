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

	getServerPlayers() {
		return this.http.get('/api/server/players');
	}

	getServerVersions() {
		return this.http.get('/api/server/versions');
	}

	getVoteLinks() {
		return this.http.get('/api/votes/links');
	}
}
