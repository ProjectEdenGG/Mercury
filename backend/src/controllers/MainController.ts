import { Controller, Get } from "@tsed/common";

@Controller("/")
export class MainController {

	@Get("/timestamp")
	timestamp() {
		return { "timestamp": new Date().toISOString() };
	}

	@Get("/votes/links")
	getVoteLinks() {
		// TODO Ask server
		return {
			"Minecraft Server List": "http://minecraft-server-list.com/server/314528/vote/",
			"Minecraft Multiplayer": "http://minecraft-mp.com/server/88565/vote/",
			"MinecraftServers.org": "http://minecraftservers.org/vote/248930",
			"FindMCServer": "https://findmcserver.com/server/projecteden?vote=true",
		}
	}

}
