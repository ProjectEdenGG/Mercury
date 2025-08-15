import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	GuardResult,
	MaybeAsync,
	Router,
	RouterStateSnapshot
} from '@angular/router';
import { ApiService } from '../service/api.service';
import { Utils } from '../utils/utils';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

	constructor(
		public utils: Utils,
		public router: Router,
		public apiService: ApiService,
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
		if (!this.utils.nerd.uuid) {
			this.router.navigate([route.data['onNoAuth'] || '/'])
			return false;
		}
		return true;
	}

}
