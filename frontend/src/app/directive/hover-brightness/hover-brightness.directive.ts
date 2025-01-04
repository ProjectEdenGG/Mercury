import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
	selector: '[hoverBrightness]',
	standalone: true,
})
export class HoverBrightnessDirective implements AfterViewInit {
	@Input('type') type: 'backgroundColor' | 'color' = 'backgroundColor'
	@Input('up') up: number;
	@Input('down') down: number;

	constructor(
		public elementRef: ElementRef,
		public renderer: Renderer2,
	) { }

	ngAfterViewInit() {
		let element = this.elementRef.nativeElement;

		let originalColor: string
		let originalHex: string
		let darkenedColor: string

		this.renderer.listen(element, 'mouseover', () => {
			if (!originalColor) {
				originalColor = getComputedStyle(element)[this.type];
				originalHex = this.rgbToHex(originalColor.match(/\d+/g).map(Number));
				darkenedColor = this.darkenColor(originalHex);
			}

			this.renderer.setStyle(element, this.type, darkenedColor);
		});

		this.renderer.listen(element, 'mouseout', () => {
			this.renderer.setStyle(element, this.type, originalHex);
		});
	}

	darkenColor(color: string): string {
		const rgb = this.hexToRgb(color);

		if (!rgb)
			return color;

		const darkenedRgb = rgb.map((component: any) =>
			Math.max(0, Math.min(255, Math.floor(component * (1 + (this.up ?? -this.down) / 100))))
		);

		return this.rgbToHex(darkenedRgb);
	}

	hexToRgb(hex: string): number[] {
		let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? [
			parseInt(result[1], 16),
			parseInt(result[2], 16),
			parseInt(result[3], 16)
		] : null;
	}

	rgbToHex(rgb: number[]): string {
		return `#${rgb.map(x => x.toString(16).padStart(2, '0')).join('')}`;
	}

}
