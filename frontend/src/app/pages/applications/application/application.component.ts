import { Component, Input } from '@angular/core';
import { Utils } from '../../../utils/utils';
import { MercuryComponent } from '../../../lifecycle/MercuryComponent';

@Component({
	selector: 'application',
	templateUrl: './application.component.html',
	styleUrl: './application.component.scss',
	standalone: false,
})
export class ApplicationComponent extends MercuryComponent {
	@Input('app') app: string;
	@Input('color') color: string;

	constructor(
		public utils: Utils,
	) {
		super()
	}

}
