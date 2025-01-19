import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Utils } from '../../utils/utils';
import { MercuryComponent } from '../../lifecycle/MercuryComponent';

@Component({
	selector: 'app-titan',
	templateUrl: './titan.component.html',
	styleUrl: './titan.component.scss',
	standalone: false,
})
export class TitanComponent extends MercuryComponent {

	constructor() {
		super()
	}

}
