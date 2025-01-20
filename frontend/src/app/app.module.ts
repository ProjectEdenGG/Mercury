import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterModule } from './components/footer/footer.module';
import { NavModule } from './components/nav/nav.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [AppComponent],
	imports: [
		AppRoutingModule,
		BrowserModule,
		RouterModule,
		NgbModule,
		FooterModule,
		NavModule,
		HttpClientModule,
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
