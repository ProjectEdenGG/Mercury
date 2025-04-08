/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

let baseHref = environment.baseHref || '/';
if (environment.baseHref !== '/') {
	const baseHrefTag = document.createElement('base');
	baseHrefTag.setAttribute('href', baseHref);
	document.getElementsByTagName('head')[0].appendChild(baseHrefTag);
}

document.addEventListener('DOMContentLoaded', async () => {
	platformBrowserDynamic().bootstrapModule(AppModule).catch(e => console.error(e))
})
