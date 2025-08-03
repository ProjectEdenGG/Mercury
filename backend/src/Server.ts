import { Configuration } from '@tsed/di';
import { MainController } from './controllers/MainController.js';
import { fileURLToPath } from 'node:url';
import { dirname } from 'path';

// Substitute for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

@Configuration({
	mount: { "/": [MainController] },
	httpPort: process.env.PORT || 8888,
	componentsScan: [`./services/**/*.ts`]
})
export class Server {}
