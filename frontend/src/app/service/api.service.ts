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
		return this.http.get('/nexus/status');
	}

	getVoteSites() {
		return this.http.get('/nexus/votes/sites');
	}
}
