import { PlatformExpress } from '@tsed/platform-express';
import { Server } from './Server';
import { $log } from '@tsed/common';

async function bootstrap() {
	try {
		let platform = await PlatformExpress.bootstrap(Server)
		await platform.listen();
	} catch (e) {
		$log.error(e)
	}
}

bootstrap()
