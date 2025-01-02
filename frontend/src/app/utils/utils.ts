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

	formatTimespan(seconds: number) {
		let days = Math.floor(seconds / (24 * 60 * 60));
		seconds %= 24 * 60 * 60;

		let hours = Math.floor(seconds / (60 * 60));
		seconds %= 60 * 60;

		let minutes = Math.floor(seconds / 60);
		seconds = Math.floor(seconds % 60);

		let format = (value: number, label: string) =>
			value == 0 ? '' : `${value} ${label}${value == 1 ? '' : 's'}, `;

		return (
			format(days, 'day') +
			format(hours, 'hour') +
			format(minutes, 'minute') +
			format(seconds, 'second')
		).replace(/, (?!.*, )/, "")
	}

}
