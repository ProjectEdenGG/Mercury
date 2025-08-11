import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ApplicationComponent } from './application.component';

const routes: Routes = [
	{ path: '', component: ApplicationComponent },
	{ path: '**', redirectTo: '' },
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ApplicationRoutingModule {
}
