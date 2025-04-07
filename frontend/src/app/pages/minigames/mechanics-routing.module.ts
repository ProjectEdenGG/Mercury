import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MechanicsComponent} from './mechanics.component';
import {LeaderboardsComponent} from './leaderboards/leaderboards.component';

const routes: Routes = [
	{ path: '', component: MechanicsComponent },
	{ path: ':mechanic', component: LeaderboardsComponent },
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MechanicsRoutingModule {
}
