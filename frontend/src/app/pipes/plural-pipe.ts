import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'plural',
	standalone: true
})
export class PluralPipe implements PipeTransform {

	transform(value: string, amount: number): string {
		return amount == 1 ? value : value + 's'
	}

}
