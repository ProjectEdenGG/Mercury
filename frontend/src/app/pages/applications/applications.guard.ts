import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { catchError, combineLatest, map, Observable } from 'rxjs';
import { Utils } from '../../utils/utils';
import { ApiService } from '../../service/api.service';
import { ApplicationsService } from './applications.service';

@Injectable({ providedIn: 'root' })
export class ApplicationsGuard implements CanActivate {

	constructor(
		public utils: Utils,
		public router: Router,
		public apiService: ApiService,
		public applicationsService: ApplicationsService,
	) { }

	canActivate(): Observable<boolean> {
		let requests = {
			applications: this.apiService.getApplications(),
		}

		return combineLatest(requests).pipe(
			map((results: any) => {
				console.log('ApplicationsGuard results', results)
				this.applicationsService.setApplications(results.applications)
				return true
			}),
			catchError((error) => {
				console.error(error)
				return [true]
			})
		)
	}
}
