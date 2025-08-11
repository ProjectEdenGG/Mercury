import { Component, Input } from '@angular/core';
import { Utils } from '../../../utils/utils';
import { MercuryComponent } from '../../../lifecycle/MercuryComponent';

@Component({
	selector: 'application-link',
	templateUrl: './application-link.component.html',
	styleUrl: './application-link.component.scss',
	standalone: false,
})
export class ApplicationLinkComponent extends MercuryComponent {
	@Input() app: string;
	@Input() color: string;
	@Input() requiredRank: string;

	constructor(
		public utils: Utils,
	) {
		super()
		this.requiredRank = this.requiredRank?.toLowerCase();
	}

	isEligible(): boolean {
		let rank = this.utils.nerd?.rank?.toLowerCase();

		if (!rank)
			return false;

		// TODO Maybe better logic, get config from server
		if (this.requiredRank == 'trusted')
			return rank !== 'guest' && rank !== 'member'

		if (this.requiredRank == 'member')
			return rank !== 'guest'

		return false;
	}

}
