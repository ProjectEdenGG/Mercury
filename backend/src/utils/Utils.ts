import { Injectable } from '@tsed/di';

@Injectable()
export class Utils {
	static ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	static NUMBERS = '0123456789';

	camelCase(text: string | null): string | null {
		if (!text || text.trim() === "")
			return text;

		return text
			.replace(/_/g, " ")
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
			.join(" ");
	}

}
