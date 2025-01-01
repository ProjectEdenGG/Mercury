import { Configuration, Inject } from '@tsed/di';
import { PlatformApplication } from '@tsed/common';
import { MainController } from './controllers/MainController';

@Configuration({
	mount: {
		"/api": [
			MainController
		]
	}
})
export class Server {
}
