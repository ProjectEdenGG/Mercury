import { Configuration, Inject } from '@tsed/di';
import { PlatformApplication } from '@tsed/common';
import { MainController } from './controllers/MainController';

@Configuration({
	rootDir: __dirname,
	mount: { "/api": [MainController] },
	httpPort: process.env.PORT || 8888,
})
export class Server {
}
