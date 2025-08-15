import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MercuryGuard } from './guard/mercury.guard';
import { ApplicationsGuard } from './pages/applications/applications.guard';

export const routes: Routes = [
	{
		path: '',
		canActivate: [MercuryGuard],
		children: [
			{ path: 'blockparty', loadChildren: () => import('./pages/blockparty/blockparty.module').then(m => m.BlockpartyModule) },
			{ path: 'minigames', loadChildren: () => import('./pages/minigames/mechanics.module').then(m => m.MechanicsModule) },
			{ path: 'vote', loadChildren: () => import('./pages/vote/vote.module').then(m => m.VoteModule) },
			{ path: 'titan', loadChildren: () => import('./pages/titan/titan.module').then(m => m.TitanModule) },
			{ path: 'status', loadChildren: () => import('./pages/status/status.module').then(m => m.StatusModule) },
			{ path: 'apply', loadChildren: () => import('./pages/applications/applications.module').then(m => m.ApplicationsModule) },
			{ path: 'appeal', loadChildren: () => import('./pages/appeal/appeal.module').then(m => m.AppealModule) },
			{ path: 'staff', loadChildren: () => import('./pages/staff/staff.module').then(m => m.StaffModule) },
			{ path: 'showcase', loadChildren: () => import('./pages/showcase/showcase.module').then(m => m.ShowcaseModule) },
			{ path: 'diversity', loadChildren: () => import('./pages/diversity/diversity.module').then(m => m.DiversityModule) },
			{ path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
			{ path: '**', redirectTo: '' },
		]
	}
]

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			initialNavigation: 'enabledNonBlocking',
			scrollPositionRestoration: 'enabled'
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
