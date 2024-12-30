import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
	{
		path: '',
		children: [
			{ path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
			{ path: '**', redirectTo: 'home' },
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
