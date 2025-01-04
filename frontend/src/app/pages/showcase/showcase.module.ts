import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcaseComponent } from './showcase.component';
import { ShowcaseRoutingModule } from './showcase-routing.module';

@NgModule({
	declarations: [ShowcaseComponent],
	imports: [
		CommonModule,
		ShowcaseRoutingModule,
	]
})
export class ShowcaseModule {
}
