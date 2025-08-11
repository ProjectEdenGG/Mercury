import { Injectable } from '@tsed/di';

@Injectable()
export class Utils {

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
