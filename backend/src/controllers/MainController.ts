import { Controller, Get } from "@tsed/common";

@Controller("/")
export class MainController {

	@Get("/timestamp")
	timestamp() {
		return { "timestamp": new Date().toISOString() };
	}

}
