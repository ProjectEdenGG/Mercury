import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadRoutingModule } from './upload-routing.module';
import { HoverBrightnessDirective } from "../../directive/hover-brightness/hover-brightness.directive";
import { UploadComponent } from './upload.component';
import { LoadingButtonModule } from '../../components/loading-button/loading-button.module';

@NgModule({
	declarations: [UploadComponent],
	imports: [
		CommonModule,
		UploadRoutingModule,
		HoverBrightnessDirective,
		LoadingButtonModule,
	]
})
export class UploadModule {
}
