import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
	{
		path: '',
		children: [
			{ path: 'vote', loadChildren: () => import('./pages/vote/vote.module').then(m => m.VoteModule) },
			{ path: 'staff', loadChildren: () => import('./pages/staff/staff.module').then(m => m.StaffModule) },
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
