import { TitanComponent } from './titan.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{ path: '', component: TitanComponent },
	{ path: '**', redirectTo: '' },
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TitanRoutingModule {
}
