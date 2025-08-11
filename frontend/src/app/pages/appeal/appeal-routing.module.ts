import { AppealComponent } from './appeal.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ApplicationsGuard } from '../applications/applications.guard';

const routes: Routes = [
	{ path: '', canActivate: [ApplicationsGuard], component: AppealComponent },
	{ path: '**', redirectTo: '' },
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AppealRoutingModule {
}
