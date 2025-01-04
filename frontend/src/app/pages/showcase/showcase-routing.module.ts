import { ShowcaseComponent } from './showcase.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{ path: ':build', component: ShowcaseComponent },
	{ path: '', component: ShowcaseComponent },
	{ path: '**', redirectTo: '' },
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ShowcaseRoutingModule {
}
