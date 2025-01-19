import { Component } from '@angular/core';
import { MercuryComponent } from '../../lifecycle/MercuryComponent';

@Component({
	selector: 'app-applications',
	templateUrl: './applications.component.html',
	styleUrl: './applications.component.scss',
	standalone: false,
})
export class ApplicationsComponent extends MercuryComponent {

	constructor() {
		super()
	}

}
