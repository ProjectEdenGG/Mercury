import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { Utils } from '../utils/utils';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

	constructor(
		public utils: Utils,
		public router: Router,
		public apiService: ApiService,
	) { }

	canActivate(): boolean {
		if (!this.utils.nerd.uuid) {
			this.router.navigate(['/apply'])
			return false;
		}
		return true;
	}
}
