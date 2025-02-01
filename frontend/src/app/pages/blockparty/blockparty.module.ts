import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockPartyComponent } from './blockparty.component';
import { BlockpartyRoutingModule } from './blockparty-routing.module';
import { SpinnerModule } from "../../components/spinner/spinner.module";

@NgModule({
	declarations: [BlockPartyComponent],
	imports: [
		CommonModule,
		BlockpartyRoutingModule,
		SpinnerModule,
	]
})
export class BlockpartyModule {
}
