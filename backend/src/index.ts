import { PlatformExpress } from '@tsed/platform-express';
import { Server } from './Server.js';
import { $log } from '@tsed/common';

try {
	const platform = await PlatformExpress.bootstrap(Server);
	await platform.listen();
} catch (e) {
	$log.error(e)
}
