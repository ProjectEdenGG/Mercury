import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type Nerd = {
	uuid: string;
	username: string;
	nickname: string;
	rank: string;
}

@Injectable({providedIn: 'root'})
export class Utils {
	originalOrder = () => 0;

	public openLoginModal$: Subject<void> = new Subject();

	public openLoginModal() {
		this.openLoginModal$.next()
	}

	public get nerd() {
		return JSON.parse(localStorage.getItem('nerd') ?? '{}');
	}

	public set nerd(nerd: Nerd) {
		if (nerd == null)
			localStorage.removeItem('nerd')
		else
			localStorage.setItem('nerd', JSON.stringify(nerd))
	}

	camelCase(text: string | null): string | null {
		if (!text || text.trim() === "") {
			return text;
		}

		return text
			.replace(/_/g, " ")
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
			.join(" ");
	}

	log(obj: any) {
		console.log(obj)
		return true;
	}

	stringify(obj: any) {
		return JSON.stringify(obj, null, 2)
	}

	asCssClass(string: any) {
		return string.toLowerCase().replaceAll(' ', '-');
	}

	formatTimespan(seconds: number, format: 'long' | 'short' = 'long', exclude?: string[]): string {
		let days = Math.floor(seconds / (24 * 60 * 60));
		seconds %= 24 * 60 * 60;

		let hours = Math.floor(seconds / (60 * 60));
		seconds %= 60 * 60;

		let minutes = Math.floor(seconds / 60);
		seconds = Math.floor(seconds % 60);

		let formatter = (value: number, label: string) => {
			if (exclude?.includes(label))
				return ''

			let finalLabel: string;
			if (format == 'long')
				finalLabel = ` ${label}${value == 1 ? '' : 's'}, `;
			else
				finalLabel = label.substring(0, 1) + ' ';

			return value == 0 ? '' : `${value}${finalLabel}`;
		};

		return (
			formatter(days, 'day') +
			formatter(hours, 'hour') +
			formatter(minutes, 'minute') +
			formatter(seconds, 'second')
		).replace(/, (?!.*, )/, "")
	}

	flagOf(countryCode: string): string {
		const codePoints = countryCode
			.toUpperCase()
			.split('')
			.map(char => 0x1f1e6 + char.charCodeAt(0) - 0x41);

		return String.fromCodePoint(...codePoints);
	}

}
