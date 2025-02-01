import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MercuryComponent } from '../../lifecycle/MercuryComponent';
import { skip, takeUntil } from 'rxjs';
import { WebsocketService } from '../../service/websocket.service';
import { ActivatedRoute } from '@angular/router';
import { Utils } from '../../utils/utils';
import { animate, state, style, transition, trigger } from '@angular/animations';



type Song = {
	url?: string;
	title?: string;
	artist?: string;
	time?: number;
}

@Component({
	selector: 'app-blockparty',
	templateUrl: './blockparty.component.html',
	styleUrl: './blockparty.component.scss',
	standalone: false,
	animations: [
		trigger('fadeInOut', [
			state('void', style({ opacity: 0 })),
			state('visible', style({ opacity: 1 })),
			transition('visible => void', [
				animate('.5s ease')
			]),
		]),
	]
})
export class BlockPartyComponent extends MercuryComponent {
	@ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
	@ViewChild('volumeControl') volumeControl!: ElementRef<HTMLInputElement>;
	@ViewChild('overlayContainer') overlayContainer!: ElementRef<HTMLElement>;

	joined = false
	reconnecting: boolean

	lastMessageWithTime: number
	overlay: boolean = true

	currentSong: Song
	block: String
	volume: number = .2
	playing: boolean

	idParam: string

	constructor(
		private utils: Utils,
		private wsService: WebsocketService,
		private route: ActivatedRoute,
		private renderer: Renderer2,
	) {
		super()
	}

	getUuid() {
		if (this.idParam)
			return this.idParam;

		return this.utils.nerd?.uuid;
	}

	override ngOnInit() {
		this.route.paramMap.subscribe(params => {
			let paramId = params.get('id');
			if (paramId === "test")
				this.idParam = this.utils.UUID_ZERO;
		});

		this.volume = Number(localStorage.getItem('blockparty-volume')) ?? .2

		this.utils.nerd$.pipe(skip(1), takeUntil(this.lifecycle().unsubscriber$)).subscribe(() => this.ensureLoggedIn());
	}

	setReconnecting() {
		this.reconnecting = true
		this.overlay = true
	}

	reconnected() {
		this.reconnecting = false
		this.overlay = false
	}

	override ngAfterViewInit() {
		this.ensureLoggedIn();
	}

	private ensureLoggedIn() {
		if (this.getUuid())
			this.initWebsocket()
		else {
			this.currentSong = null
			this.block = null
			this.playing = false
			this.wsService.disconnect()

			this.utils.openLoginModal({
				keyboard: false,
				backdrop: 'static',
				title: 'You must be logged in',
				onDismiss: () => {
					this.ensureLoggedIn()
				}
			})
		}
	}

	initWebsocket() {
		if (this.wsService.isConnected())
			return

		this.wsService.connect(this.getUuid());
		this.wsService.getMessages().pipe(takeUntil(this.lifecycle().unsubscriber$)).subscribe(socketMessage => {
			if (socketMessage === true)
				return

			let messages = Array.isArray(socketMessage) ? socketMessage : [socketMessage];

			for (let message of messages) {
				if (message.uuids)
					if (!message.uuids.find((uuid: string) => uuid === this.getUuid()))
						continue;

				if (message.song) {
					this.lastMessageWithTime = Date.now()
					this.currentSong = message.song as Song;
				}
				if (message.time) {
					this.lastMessageWithTime = Date.now()
					this.currentSong.time = message.time;
				}
				if (message.action === 'play') {
					this.playing = true
					this.play();
				} else if (message.action === 'pause') {
					this.playing = false
					this.pause();
				} else if (message.action === 'stop') {
					this.playing = false
					this.stop();
				} else if (message.action === 'block')
					this.block = this.utils.camelCase(message.block).replace(/ /g, '_')
			}
		});
	}

	join() {
		this.joined = true
		this.overlay = false
		this.play();
	}

	play() {
		if (!this.currentSong)
			return

		if (!this.playing)
			return

		// TODO Remove
		if (!this.joined)
			return

		if (this.currentSong.time) {
			this.audioPlayer.nativeElement.currentTime = this.currentSong.time + ((Date.now() - this.lastMessageWithTime) / 1000);
			this.currentSong.time = null;
		}

		if (this.audioPlayer.nativeElement.readyState >= 3) {
			this.audioPlayer.nativeElement.play().then(() => this.joined = true);
		} else {
			let unlisten = this.renderer.listen(this.audioPlayer.nativeElement, 'canplay', () => {
				this.audioPlayer.nativeElement.play().then(() => this.joined = true)
				unlisten();
			})
		}
	}

	pause() {
		this.audioPlayer.nativeElement.pause();
	}

	stop() {
		this.currentSong = null;
	}

	updateVolume() {
		this.volume = Number(this.volumeControl.nativeElement.value);
		localStorage.setItem('blockparty-volume', this.volume.toString());
	}
}
