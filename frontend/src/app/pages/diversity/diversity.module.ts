import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiversityComponent } from './diversity.component';
import { DiversityRoutingModule } from './diversity-routing.module';
import { SpinnerModule } from "../../components/spinner/spinner.module";

@NgModule({
	declarations: [DiversityComponent],
	imports: [
		CommonModule,
		DiversityRoutingModule,
		SpinnerModule,
	]
})
export class DiversityModule {
}
