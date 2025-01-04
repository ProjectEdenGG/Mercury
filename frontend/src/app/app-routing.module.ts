import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
	{
		path: '',
		children: [
			{ path: 'vote', loadChildren: () => import('./pages/vote/vote.module').then(m => m.VoteModule) },
			{ path: 'titan', loadChildren: () => import('./pages/titan/titan.module').then(m => m.TitanModule) },
			{ path: 'staff', loadChildren: () => import('./pages/staff/staff.module').then(m => m.StaffModule) },
			{ path: 'status', loadChildren: () => import('./pages/status/status.module').then(m => m.StatusModule) },
			{ path: 'applications', loadChildren: () => import('./pages/applications/applications.module').then(m => m.ApplicationsModule) },
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
