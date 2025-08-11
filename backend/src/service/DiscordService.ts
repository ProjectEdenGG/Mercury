import { Injectable } from "@tsed/di";
import { ChannelType, Client, Events, ForumChannel, GatewayIntentBits, Guild, GuildBasedChannel, Snowflake } from 'discord.js';
import { ConfigService } from './ConfigService.js';
import { $log } from '@tsed/common';
import { InternalServerError } from '@tsed/exceptions';

@Injectable()
export class DiscordService {
	private readonly GUILD_ID: Snowflake = '132680070480396288'
	private readonly client = new Client({ intents: [GatewayIntentBits.Guilds] });

	constructor(
		private configService: ConfigService,
	) {
		this.client.once(Events.ClientReady, readyClient => {
			$log.info(`[Discord] Logged in as ${readyClient.user.tag}`);
		});

		this.client.login(this.configService.files.secrets.discord.koda.token);
	}

	public getClient(): Client {
		return this.client;
	}

	public getGuild(): Guild {
		const guild: Guild | undefined = this.client.guilds.cache.get(this.GUILD_ID);
		if (!guild?.available)
			throw new InternalServerError('Guild is not available');
		return guild;
	}

	private isForumChannel(channel: GuildBasedChannel): channel is ForumChannel {
		return channel.type === ChannelType.GuildForum;
	}

	getForumChannel(id: Snowflake): ForumChannel {
		let channel: GuildBasedChannel | undefined = this.getGuild().channels.cache.get(id);
		if (!channel)
			throw new Error(`Channel ${id} is not available`);
		if (!this.isForumChannel(channel))
			throw new Error(`Channel ${id} is not a forum channel`);

		return channel;
	}

}
