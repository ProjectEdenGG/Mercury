import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

export type ModalOptions = NgbModalOptions & {
	title?: string,
	onDismiss?: () => void,
};

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
	private options: ModalOptions

	constructor(
		public modalService: NgbModal,
	) {
	}

	open(options?: ModalOptions) {
		if (this.modalRef)
			this.modalRef.dismiss()

		this.options = {
			size: 'lg',
			centered: true,
			...options,
		}

		this.modalRef = this.modalService.open(this.modal, this.options)

		if (this.options.onDismiss)
			this.onDismiss(this.options.onDismiss)
	}

	close() {
		this.modalRef?.dismiss()
		this.modalRef = null
	}

	onDismiss(onDismiss: () => void) {
		this.modalRef.dismissed.subscribe(() => onDismiss());
	}

	hasOpenModals(): boolean {
		return this.modalService.hasOpenModals()
	}

	setSize(size: string) {
		// @ts-ignore
		this.modalRef._windowCmptRef.instance.size = size
	}
}
