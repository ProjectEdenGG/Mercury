import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MinigamesComponent} from './minigames.component';

const routes: Routes = [
	{ path: ':mechanic', component: MinigamesComponent },
	{ path: '', component: MinigamesComponent },
	{ path: '**', redirectTo: '' },
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class MinigamesRoutingModule {
}
