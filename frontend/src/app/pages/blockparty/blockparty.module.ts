import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockPartyComponent } from './blockparty.component';
import { BlockpartyRoutingModule } from './blockparty-routing.module';

@NgModule({
	declarations: [BlockPartyComponent],
	imports: [
		CommonModule,
		BlockpartyRoutingModule,
	]
})
export class BlockpartyModule {
}
