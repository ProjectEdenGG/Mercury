import { Injectable } from "@tsed/di";
import { ConfigService } from './ConfigService.js';
import { DiscordService } from './DiscordService.js';
import { ForumChannel, ForumThreadChannel, Snowflake } from 'discord.js';
import { BadRequest, InternalServerError } from '@tsed/exceptions';
import { $log, application } from '@tsed/common';
import { Utils } from '../utils/Utils.js';
import fs from 'node:fs';
import path from 'node:path';

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

	getApplication(appId: string) {
		let application = this.getApplications().find((application: any) => application.id === appId || application.short === appId);
		if (!application)
			throw new BadRequest("Could not find application with id " + appId)
		return application
	}

	async submitApplication(application: any, nerd: any, answers: any) {
		let body: string[] = this.getApplicationBody(application, answers);

		try {
			this.logApplicationToFile(application, body, nerd);
		} catch (error) {
			$log.error(error)
		}

		try {
			await this.submitApplicationToDiscord(application, body, nerd);
		} catch (error) {
			$log.error(error)
			throw new InternalServerError("Failed to post application to Discord, please notify a staff member so they can retrieve your application from the logs")
		}
	}

	private getApplicationBody(application: any, answers: any): string[] {
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

	private logApplicationToFile(application: any, body: any, nerd: any) {
		let dir = path.join(process.cwd(), 'applications')
		let file = path.join(dir, `${nerd.nickname}-${application.id}-${new Date().toISOString()}.txt`.replace(/:/g, '-'));
		console.log(dir, file)
		fs.mkdirSync(dir, { recursive: true })
		fs.writeFileSync(file, body.join('\n\n'))
	}

	private async submitApplicationToDiscord(application: any, body: string[], nerd: any) {
		const forum = this.discordService.getForumChannel(this.CHANNEL_ID)
		const tag = this.getTag(application, forum);

		let name = `${application.title} - ${nerd.nickname}`;

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

	private getTag(application: any, forum: ForumChannel) {
		const tag = forum?.availableTags.find(tag => tag.name === application.name);
		if (!tag)
			throw new InternalServerError(`Tag ${application.name} is not available`)
		return tag;
	}
}
