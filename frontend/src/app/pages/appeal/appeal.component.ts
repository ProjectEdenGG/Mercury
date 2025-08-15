import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { MercuryComponent } from '../../lifecycle/MercuryComponent';
import svgMap from 'svgmap';

@Component({
	selector: 'app-appeal',
	templateUrl: './appeal.component.html',
	styleUrl: './appeal.component.scss',
	standalone: false,
})
export class AppealComponent extends MercuryComponent {

	constructor() {
		super()
	}

}
