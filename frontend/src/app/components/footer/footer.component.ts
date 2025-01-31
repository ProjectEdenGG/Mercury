import { Component } from '@angular/core';
import { Utils } from '../../utils/utils';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.scss',
	standalone: false,
})
export class FooterComponent {

	constructor(
		public utils: Utils,
	) { }

	currentYear() {
		return new Date().getFullYear();
	}
}
