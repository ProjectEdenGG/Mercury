import { Injectable, Renderer2 } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, combineLatest, map, Observable } from 'rxjs';
import { ApiService } from '../service/api.service';
import { Utils } from '../utils/utils';

@Injectable({ providedIn: 'root' })
export class MercuryGuard implements CanActivate {

	constructor(
		public utils: Utils,
		public router: Router,
		public apiService: ApiService,
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		let uuid = (route.queryParamMap as any)?.params?.uuid ?? this.utils.nerd?.uuid;

		let requests = {
			ranks: this.apiService.getRanks(),
			...uuid && { nerd: this.apiService.getNerd(uuid) }
		}

		return combineLatest(requests).pipe(
			map((results: any) => {
				console.log('MercuryGuard results', results)

				for (let rank of results.ranks)
					this.utils.createRankCss(rank);

				if ('nerd' in results)
					this.utils.nerd = results.nerd

				return true
			}),
			catchError((error) => {
				console.error(error)
				return [true]
			})
		)
	}
}
