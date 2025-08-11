import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ApplicationsComponent } from './applications.component';
import { AuthGuard } from '../../guard/auth.guard';
import { ApplicationsGuard } from './applications.guard';

const routes: Routes = [
	{ path: ':app', canActivate: [AuthGuard, ApplicationsGuard], loadChildren: () => import('./application/application.module').then(m => m.ApplicationModule) },
	{ path: '', canActivate: [ApplicationsGuard], component: ApplicationsComponent },
	{ path: '**', redirectTo: '' },
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ApplicationsRoutingModule {
}
