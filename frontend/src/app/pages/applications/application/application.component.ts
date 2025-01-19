import { Component, Input } from '@angular/core';
import { Utils } from '../../../utils/utils';
import { MercuryComponent } from '../../../lifecycle/MercuryComponent';
import { ResponsiveUtil } from '../../../utils/responsive-util.component';

@Component({
	selector: 'application',
	templateUrl: './application.component.html',
	styleUrl: './application.component.scss',
	standalone: false,
})
export class ApplicationComponent extends MercuryComponent {
	@Input() app: string;
	@Input() color: string;
	@Input() requiredRank: string;

	constructor(
		public utils: Utils,
		public responsiveUtil: ResponsiveUtil,
	) {
		super()
	}

	isEligible(): boolean {
		this.requiredRank = this.requiredRank?.toLowerCase();
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
