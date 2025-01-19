import { Component, Input } from '@angular/core';
import { FormMessage } from '../../utils/form-util';

@Component({
	selector: 'form-message',
	templateUrl: './form-message.component.html',
	styleUrl: './form-message.component.scss',
	standalone: false,
})
export class FormMessageComponent {
	@Input() message: FormMessage
}
