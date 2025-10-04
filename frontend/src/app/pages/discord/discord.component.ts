import { Component, ElementRef, ViewChild } from '@angular/core';
import { MercuryComponent } from '../../lifecycle/MercuryComponent';
import { ResponsiveUtil } from '../../utils/responsive-util.component';

@Component({
	selector: 'app-discord',
	templateUrl: './discord.component.html',
	styleUrl: './discord.component.scss',
	standalone: false,
})
export class DiscordComponent extends MercuryComponent {
	@ViewChild('wrapper') wrapper: ElementRef;

	constructor(
		public responsiveUtil: ResponsiveUtil,
	) {
		super()
	}

	override ngAfterViewInit() {
		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.async = true;
		script.src = 'https://cdn.jsdelivr.net/npm/@widgetbot/html-embed';
		document.getElementsByTagName('head')[0].appendChild(script);
	}

}
