import { Component, ViewChild, ElementRef } from '@angular/core';
import { MercuryComponent } from '../../lifecycle/MercuryComponent';
import { ApiService } from '../../service/api.service';

@Component({
	selector: 'app-image-upload',
	templateUrl: './upload.component.html',
	styleUrl: './upload.component.scss',
	standalone: false,
})
export class UploadComponent extends MercuryComponent {
	@ViewChild('fileInput') fileInput: ElementRef;

	uploadedImage: any;
	uploading: boolean = false;
	error: string = '';
	dragOver: boolean = false;

	constructor(
		private apiService: ApiService,
	) {
		super();
	}

	onFileSelected(event: Event): void {
		const target = event.target as HTMLInputElement;
		const files = target.files;
		if (files && files.length > 0) {
			this.handleFile(files[0]);
		}
	}

	onDragOver(event: DragEvent): void {
		event.preventDefault();
		this.dragOver = true;
	}

	onDragLeave(event: DragEvent): void {
		event.preventDefault();
		this.dragOver = false;
	}

	onDrop(event: DragEvent): void {
		event.preventDefault();
		this.dragOver = false;
		if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
			this.handleFile(event.dataTransfer.files[0]);
		}
	}

	onPaste(event: ClipboardEvent): void {
		const items = event.clipboardData?.items;
		if (items) {
			for (let i = 0; i < items.length; i++) {
				if (items[i].type.indexOf('image') !== -1) {
					const file = items[i].getAsFile();
					if (file) {
						this.handleFile(file);
					}
				}
			}
		}
	}

	private handleFile(file: File): void {
		// Validate file type
		if (!file.type.startsWith('image/')) {
			this.error = 'Please select a valid image file';
			return;
		}

		// Create preview
		const reader = new FileReader();
		reader.onload = (e) => {
			this.uploadedImage = null;
			this.error = '';

			const preview = {
				src: e.target?.result as string,
				file: file
			};

			this.uploadImage(preview.file);
		};

		this.uploadImage(file);
	}

	private uploadImage(file: File): void {
		this.uploading = true;
		this.error = '';

		const formData = new FormData();
		formData.append('image', file);

		this.apiService.uploadImage(formData).subscribe({
			next: (response: any) => {
				this.uploadedImage = {
					filename: response.filename,
					url: response.url,
					preview: URL.createObjectURL(file),
				};
				this.uploading = false;
				this.copyToClipboard()
			},
			error: (error) => {
				console.error('Upload failed:', error);
				this.error = 'Failed to upload image. Please try again.';
				this.uploading = false;
			}
		});
	}

	triggerFileInput(): void {
		if (this.fileInput) {
			this.fileInput.nativeElement.click();
		}
	}

	openImage(): void {
		window.open(this.uploadedImage.url, '_blank');
		this.copyToClipboard();
	}

	copyToClipboard(): void {
		navigator.clipboard.writeText(this.uploadedImage.url).then(() => {
			console.log('URL copied to clipboard');
		}).catch(err => {
			console.error('Failed to copy:', err);
		});
	}

	resetUpload(): void {
		this.uploadedImage = null;
		this.error = '';
		this.dragOver = false;
		if (this.fileInput) {
			this.fileInput.nativeElement.value = '';
		}
	}
}
