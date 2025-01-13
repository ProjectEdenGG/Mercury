import { Component, Input } from '@angular/core';

@Component({
	selector: 'progress-bar',
	templateUrl: './progress-bar.component.html',
	styleUrl: './progress-bar.component.scss',
	standalone: false,
})
export class ProgressBarComponent {
	@Input() percentage: number
}
