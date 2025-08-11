import { Injectable } from "@tsed/di";
import { ConfigService } from './ConfigService.js';
import { DiscordService } from './DiscordService.js';
import { ForumChannel, Snowflake } from 'discord.js';
import { InternalServerError } from '@tsed/exceptions';
import { $log } from '@tsed/common';
import { Utils } from '../utils/Utils.js';

@Injectable()
export class ApplicationsService {
	private readonly CHANNEL_ID: Snowflake = '1404309409403764872'

	constructor(
		private utils: Utils,
		private configService: ConfigService,
		private discordService: DiscordService,
	) { }

	getApplications() {
		return this.configService.files.applications
	}

	submitApplication(appType: string, nerd: any, answers: any) {
		$log.info('answers', answers)
		try {
			this.logApplicationToFile(appType, answers, nerd);
		} catch (error) {
			$log.error(error)
		}

		try {
			this.submitApplicationToDiscord(appType, answers, nerd);
		} catch (error) {
			$log.error(error)
			throw new InternalServerError("Failed to post application to Discord, please notify a staff member so they can retrieve the application from the logs")
		}
	}

	private logApplicationToFile(appType: string, answers: any, nerd: any) {
		// TODO
	}

	private submitApplicationToDiscord(appType: string, answers: any, nerd: any) {
		const forum = this.discordService.getForumChannel(this.CHANNEL_ID)
		const tag = this.getTag(forum, appType);

		forum?.threads.create({
			message: {
				content: JSON.stringify(answers)
			},
			name: this.utils.camelCase(appType) + " Application - " + nerd.nickname,
			appliedTags: [tag.id]
		})
	}

	private getTag(forum: ForumChannel, id: string) {
		const tag = forum?.availableTags.find(tag => tag.name.toLowerCase() === id);
		if (!tag)
			throw new InternalServerError(`Tag ${id} is not available`)
		return tag;
	}
}
