import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingButtonComponent } from './loading-button.component';
import { SpinnerModule } from '../spinner/spinner.module';

@NgModule({
	declarations: [LoadingButtonComponent],
	imports: [
		CommonModule,
		SpinnerModule,
	],
	exports: [LoadingButtonComponent]
})
export class LoadingButtonModule {}
