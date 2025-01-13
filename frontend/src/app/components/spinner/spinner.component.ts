import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

// https://codepen.io/jkantner/pen/YzoJdeG

@Component({
	selector: 'spinner',
	templateUrl: './spinner.component.html',
	styleUrl: './spinner.component.scss',
	standalone: false,
})
export class SpinnerComponent {
	@Input() display: string = "block"
	@Input() classes: string
}
