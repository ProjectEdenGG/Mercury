import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitanComponent } from './titan.component';
import { TitanRoutingModule } from './titan-routing.module';

@NgModule({
	declarations: [TitanComponent],
	imports: [
		CommonModule,
		TitanRoutingModule,
	]
})
export class TitanModule {
}
