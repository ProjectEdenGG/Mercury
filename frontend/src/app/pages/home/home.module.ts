import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { CmsImagePipe } from "../../pipes/cms-pipe";
import { PluralPipe } from "../../pipes/plural-pipe";

@NgModule({
	declarations: [HomeComponent],
	imports: [
		CommonModule,
		HomeRoutingModule,
		CmsImagePipe,
		PluralPipe,
	]
})
export class HomeModule {
}
