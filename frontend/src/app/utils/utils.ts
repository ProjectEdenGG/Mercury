import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, skip } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { ModalOptions } from '../components/modal/modal.component';

export type Nerd = {
	uuid: string;
	username: string;
	nickname: string;
	rank: string;
}

@Injectable({providedIn: 'root'})
export class Utils {
	originalOrder = () => 0;
	UUID_ZERO = '00000000-0000-0000-0000-000000000000';

	public openLoginModal$: BehaviorSubject<ModalOptions> = new BehaviorSubject(null);
	public nerd$: BehaviorSubject<Nerd> = new BehaviorSubject(null);

	constructor(
		@Inject(DOCUMENT) private document: Document
	) {
		this.nerd$.pipe(skip(1)).subscribe({
			next: nerd => {
				if (nerd == null)
					localStorage.removeItem('nerd')
				else
					localStorage.setItem('nerd', JSON.stringify(nerd))
			}
		})
	}

	public openLoginModal(options?: ModalOptions) {
		this.openLoginModal$.next(options ?? {})
	}

	public get nerd() {
		return JSON.parse(localStorage.getItem('nerd') ?? '{}');
	}

	public set nerd(nerd: Nerd) {
		this.nerd$.next(nerd);
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

	private styleElement: any

	createRankCss(rank: any) {
		let cssified = this.asCssClass(rank.name)
		let variable = `--color-${cssified}`
		this.createCssVariable(variable, rank.color)
		this.createCssClass(`.color-${cssified} { color: var(${variable}); }`)
		this.createCssClass(`.background-color-${cssified} { background-color: var(${variable}); }`)
	}

	asCssClass(string: any) {
		return string.toLowerCase().replaceAll(' ', '-');
	}

	createCssVariable(variable: string, value: any) {
		document.documentElement.style.setProperty(variable, value)
	}

	createCssClass(style: string) {
		if (!this.styleElement) {
			this.styleElement = document.createElement('style')
			document.head.appendChild(this.styleElement)
		}
		this.styleElement.textContent = this.styleElement.textContent + style
	}

	getEnvironment(): 'development' | 'production' {
		return this.document.location.hostname.includes('localhost') ? 'development' : 'production';
	}

}
