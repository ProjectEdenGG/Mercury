import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { MercuryComponent } from '../../lifecycle/MercuryComponent';
import svgMap from 'svgmap';

@Component({
	selector: 'app-diversity',
	templateUrl: './diversity.component.html',
	styleUrl: './diversity.component.scss',
	standalone: false,
})
export class DiversityComponent extends MercuryComponent {
	loading: boolean
	values: any
	type: 'players' | 'hours' = 'players'

	@ViewChild('map') map: ElementRef;

	constructor(
		public apiService: ApiService,
	) {
		super()
	}

	override ngAfterViewInit() {
		this.loading = true
		this.apiService.getDiversity().subscribe({
			next: (result: any) => {
				this.values = result
				this.updateMap()
				this.loading = false;
			},
			error: (error: any) => {
				console.error(error)
				this.loading = false;
			}
		})
	}

	updateMap() {
		new svgMap({
			targetElementID: `map`,
			colorMin: '#FFE5D9',
			colorMax: '#CC0033',
			colorNoData: '#2e2e2e',
			minZoom: 1.06,
			data: {
				data: {
					players: {
						name: 'Number of players',
						format: '{0}',
						thresholdMax: 100,
						thousandSeparator: ',',
					},
					hours: {
						name: 'Hours played',
						format: '{0}',
						thresholdMax: 5000,
						thousandSeparator: ',',
					}
				},
				applyData: this.type,
				values: this.values
			}
		})

		let element = document.querySelector('#map');
		if (!element || !element.firstChild)
			return;

		while (element.childNodes.length > 1)
			element.removeChild(element.lastChild);
	}
}
