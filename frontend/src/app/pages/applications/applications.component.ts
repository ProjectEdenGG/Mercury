import { Component } from '@angular/core';
import { MercuryComponent } from '../../lifecycle/MercuryComponent';
import { ApplicationsService } from './applications.service';

@Component({
	selector: 'app-applications',
	templateUrl: './applications.component.html',
	styleUrl: './applications.component.scss',
	standalone: false,
})
export class ApplicationsComponent extends MercuryComponent {

	constructor(
		public applicationsService: ApplicationsService,
	) {
		super()
	}

}
