/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

document.addEventListener('DOMContentLoaded', async () => {
	platformBrowserDynamic().bootstrapModule(AppModule).catch(e => console.error(e))
})
