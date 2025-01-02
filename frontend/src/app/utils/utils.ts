import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class Utils {

	log(obj: any) {
		console.log(obj)
		return true;
	}

	stringify(obj: any) {
		return JSON.stringify(obj, null, 2)
	}

}
