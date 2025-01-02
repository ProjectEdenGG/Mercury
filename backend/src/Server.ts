import { Configuration } from '@tsed/di';
import { MainController } from './controllers/MainController';

@Configuration({
	rootDir: __dirname,
	mount: { "/": [MainController] },
	httpPort: process.env.PORT || 8888,
})
export class Server {
}
