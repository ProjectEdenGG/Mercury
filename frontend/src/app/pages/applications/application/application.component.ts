import { Component, Input } from '@angular/core';
import { Utils } from '../../../utils/utils';

@Component({
	selector: 'application',
	templateUrl: './application.component.html',
	styleUrl: './application.component.scss',
	standalone: false,
})
export class ApplicationComponent {
	@Input('app') app: string;
	@Input('color') color: string;

	constructor(
		public utils: Utils,
	) { }

}
