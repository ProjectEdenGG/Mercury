import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {MercuryComponent} from '../../lifecycle/MercuryComponent';
import {takeUntil} from 'rxjs';
import {WebsocketService} from '../../service/websocket.service';
import {ActivatedRoute} from '@angular/router';
import {Utils} from '../../utils/utils';

const UUID_ZERO = '00000000-0000-0000-0000-000000000000';

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
})
export class BlockPartyComponent extends MercuryComponent {
	@ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
	@ViewChild('volumeControl') volumeControl!: ElementRef<HTMLInputElement>;
	@ViewChild('playButtonContainer') playButtonContainer!: ElementRef<HTMLElement>;
	joined = false;
	currentSong: Song;
	block: String
	volume: number = .2;
	lastMessageWithTime: number;
	playing: boolean

	constructor(
		private utils: Utils,
		private wsService: WebsocketService,
		private route: ActivatedRoute,
		private renderer: Renderer2,
	) {
		super()
	}

	override ngOnInit() {
		let uuid = this.utils.nerd?.uuid ?? UUID_ZERO;

		this.route.paramMap.subscribe(params => {
			let paramId = params.get('id');
			if (paramId === "test")
				uuid = UUID_ZERO;
		});

		this.volume = Number(localStorage.getItem('blockparty-volume')) ?? .2

		this.wsService.connect(uuid);
		this.wsService.getMessages().pipe(takeUntil(this.lifecycle().unsubscriber$)).subscribe(socketMessage => {
			let messages = Array.isArray(socketMessage) ? socketMessage : [socketMessage];

			for (let message of messages) {
				if (message.uuids) { // .includes wasn't working here...
					let found = false;
					for (let msgUuid of message.uuids) {
						if (msgUuid === uuid) {
							found = true;
							break;
						}
					}
					if (!found)
						continue;
				}

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
					this.block = message.block
			}
		});
	}

	override ngAfterViewInit() {
		this.renderer.listen(this.playButtonContainer.nativeElement, 'transitionend', () => {
			this.playButtonContainer.nativeElement.remove()
		})
	}

	join() {
		this.joined = true;
		this.play();
	}

	play() {
		if (!this.currentSong)
			return

		if (!this.playing)
			return

		if (this.currentSong.time)
			this.audioPlayer.nativeElement.currentTime = this.currentSong.time + ((Date.now() - this.lastMessageWithTime) / 1000);

		if (this.audioPlayer.nativeElement.readyState >= 3) {
			this.audioPlayer.nativeElement.play().then(() => this.joined = true);
		} else {
			let unlisten = this.renderer.listen(this.audioPlayer.nativeElement, 'canplay', () => {
				this.audioPlayer.nativeElement.play()
					.then(() => this.joined = true)
					.catch(() => {});
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
