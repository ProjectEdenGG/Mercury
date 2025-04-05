import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MinigamesComponent} from './minigames.component';
import {SpinnerModule} from "../../components/spinner/spinner.module";
import {CmsImagePipe} from '../../pipes/cms-pipe';
import {MinigamesRoutingModule} from './minigames-routing.module';
import {FormsModule} from '@angular/forms';

@NgModule({
	declarations: [MinigamesComponent],
	imports: [
		CommonModule,
		SpinnerModule,
		CmsImagePipe,
		MinigamesRoutingModule,
		FormsModule
	]
})
export class MinigamesModule {
}
