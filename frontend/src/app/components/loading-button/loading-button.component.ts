import { Component, Input } from '@angular/core';

@Component({
	selector: 'loading-button',
	templateUrl: './loading-button.component.html',
	styleUrl: './loading-button.component.scss',
	standalone: false,
})
export class LoadingButtonComponent {
	@Input() loading: boolean
	@Input() type: string;
	@Input() classes: string;
}
