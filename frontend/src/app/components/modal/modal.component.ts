import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'modal',
	templateUrl: './modal.component.html',
	styleUrl: './modal.component.scss',
	standalone: false,
})
export class ModalComponent {
	@Input() closeButton: boolean = true

	@ViewChild('modal') modal: TemplateRef<any>;
	private modalRef: NgbModalRef = null;

	constructor(
		public modalService: NgbModal,
	) {
	}

	open(options?: NgbModalOptions) {
		if (this.modalRef)
			this.modalRef.dismiss()

		let opts = {
			size: 'lg',
			centered: true,
			...options,
		}

		this.modalRef = this.modalService.open(this.modal, opts)
	}

	close() {
		this.modalRef?.dismiss()
		this.modalRef = null
	}

	hasOpenModals(): boolean {
		return this.modalService.hasOpenModals()
	}

	setSize(size: string) {
		// @ts-ignore
		this.modalRef._windowCmptRef.instance.size = size
	}
}
