import { Injectable } from "@tsed/di";
import { ConfigService } from './ConfigService.js';
import { DiscordService } from './DiscordService.js';
import { ForumChannel, ForumThreadChannel, Snowflake } from 'discord.js';
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

	async submitApplication(appId: string, nerd: any, answers: any) {
		$log.info('answers', answers)

		let body: string[] = this.getApplicationBody(appId, answers);

		try {
			this.logApplicationToFile(appId, body, nerd);
		} catch (error) {
			$log.error(error)
		}

		try {
			await this.submitApplicationToDiscord(appId, body, nerd);
		} catch (error) {
			$log.error(error)
			throw new InternalServerError("Failed to post application to Discord, please notify a staff member so they can retrieve the application from the logs")
		}
	}

	private getApplicationBody(appId: string, answers: any): string[] {
		let application = this.getApplications().find((application: any) => application.id === appId);
		let questions = application.pages.map((page: any) => page.questions).flat();

		let body: string[] = []
		let current: string = ''
		for (let answer of Object.keys(answers)) {
			let label = `${questions.find((question: any) => question?.id === answer)?.label}`;
			let value = `${answers[answer]}`;
			let next = `**${label}**\n${value}\n\n`;
			let length = current.length + next.length;

			if (length >= 2000) {
				body.push(current.trim())
				current = next;
			} else {
				current += next;
			}
		}

		if (current)
			body.push(current.trim())

		$log.info('body', body)

		return body;
	}

	private logApplicationToFile(appId: string, body: any, nerd: any) {
		// TODO
	}

	private async submitApplicationToDiscord(appId: string, body: string[], nerd: any) {
		const forum = this.discordService.getForumChannel(this.CHANNEL_ID)
		const tag = this.getTag(forum, appId);

		let name = this.utils.camelCase(appId) + " Application - " + nerd.nickname;

		let thread: ForumThreadChannel = await forum?.threads.create({
			message: {
				content: name
			},
			name: name,
			appliedTags: [tag.id]
		})

		for (let message of body)
			await thread.send(message);
	}

	private getTag(forum: ForumChannel, id: string) {
		const tag = forum?.availableTags.find(tag => tag.name.toLowerCase() === id);
		if (!tag)
			throw new InternalServerError(`Tag ${id} is not available`)
		return tag;
	}
}
