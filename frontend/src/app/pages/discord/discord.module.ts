import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscordComponent } from './discord.component';
import { DiscordRoutingModule } from './discord-routing.module';
import { SpinnerModule } from "../../components/spinner/spinner.module";
import { ApplicationModule } from "../applications/application/application.module";

@NgModule({
	declarations: [DiscordComponent],
	imports: [
		CommonModule,
		DiscordRoutingModule,
		SpinnerModule,
		ApplicationModule,
	],
	schemas: [NO_ERRORS_SCHEMA],
})
export class DiscordModule {
}
