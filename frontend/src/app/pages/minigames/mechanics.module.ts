import {MechanicsComponent} from './mechanics.component';
import {MechanicsRoutingModule} from './mechanics-routing.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SpinnerModule} from '../../components/spinner/spinner.module';
import {CmsImagePipe} from '../../pipes/cms-pipe';
import {LeaderboardsComponent} from './leaderboards/leaderboards.component';

@NgModule({
	declarations: [MechanicsComponent, LeaderboardsComponent],
	imports: [
		CommonModule,
		MechanicsRoutingModule,
		FormsModule,
		SpinnerModule,
		CmsImagePipe
	]
})
export class MechanicsModule {
}
