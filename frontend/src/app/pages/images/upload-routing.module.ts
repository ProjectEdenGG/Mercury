import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UploadComponent } from './upload.component';

const routes: Routes = [
	{ path: '', component: UploadComponent },
	{ path: '**', redirectTo: '' },
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UploadRoutingModule {
}
