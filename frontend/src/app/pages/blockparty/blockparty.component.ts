import { ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import {MercuryComponent} from '../../lifecycle/MercuryComponent';
import {takeUntil} from 'rxjs';
import {WebsocketService} from '../../service/websocket.service';
import {ActivatedRoute} from '@angular/router';
import { Utils } from '../../utils/utils';

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
	id: String;
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
		this.route.paramMap.subscribe(params => {
			let paramId = params.get('id');
			this.id = paramId && paramId.trim() !== '' ? paramId : 'test';
		});

		this.volume = Number(localStorage.getItem('blockparty-volume')) ?? .2

		let uuid = this.utils.nerd?.uuid;

		this.wsService.getMessages().pipe(takeUntil(this.lifecycle().unsubscriber$)).subscribe(messages => {
			for (let message of messages) {
				if (message.id !== this.id)
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
				this.audioPlayer.nativeElement.play().then(() => this.joined = true);
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
