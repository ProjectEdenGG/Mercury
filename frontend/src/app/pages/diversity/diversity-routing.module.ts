import { DiversityComponent } from './diversity.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{ path: '', component: DiversityComponent },
	{ path: '**', redirectTo: '' },
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DiversityRoutingModule {
}
