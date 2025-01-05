import { Pipe, PipeTransform } from '@angular/core';
import twemoji from '@twemoji/api';

@Pipe({
	name: 'twemoji',
	standalone: true
})
export class TwemojiPipe implements PipeTransform {
	transform(value: string): string {
		return twemoji.parse(value, { folder: 'svg', ext: '.svg' });
	}
}
