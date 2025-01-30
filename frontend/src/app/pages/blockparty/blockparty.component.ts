import {Component, ElementRef, ViewChild} from '@angular/core';
import { MercuryComponent } from '../../lifecycle/MercuryComponent';
import {Subscription, takeUntil} from 'rxjs';
import {WebsocketService} from '../../service/websocket.service';
import {ApiService} from '../../service/api.service';
import {Nerd} from '../../utils/utils';

type Song = {
	url?: string;
	title?: string;
	artist?: string;
	time?: number;
	playing?: boolean;
}

@Component({
	selector: 'app-blockparty',
	templateUrl: './blockparty.component.html',
	styleUrl: './blockparty.component.scss',
	standalone: false,
})
export class BlockPartyComponent extends MercuryComponent {

	@ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
	joined = false;
	loading = false;
	currentSong: Song;

	constructor(
		private wsService: WebsocketService,
		private apiService: ApiService,
	) {
		super()
	}

	override ngOnInit() {
		this.wsService.getMessages().pipe(takeUntil(this.lifecycle().unsubscriber$)).subscribe(message => {
			if (message.song)
				this.currentSong = message.song as Song;
			else if (message.action === 'play')
				this.play();
			else if (message.action === 'pause')
				this.pause();
			else if (message.action === 'stop')
				this.stop();
		});
	}

	join() {
		this.joined = true;

		this.loading = true;
		this.apiService.currentPlayerSong().subscribe({
			next: (response: any) => {
				this.audioPlayer.nativeElement.volume = .5;
				if (response) {
					this.currentSong = response as Song;
					if (this.currentSong.time)
						this.audioPlayer.nativeElement.currentTime = this.currentSong.time;
					if (this.currentSong.playing)
						this.audioPlayer.nativeElement.play();
				}
				this.loading = false;
			},
			error: ex => {
				console.error(ex);
			}
		});
	}

	play() {
		this.audioPlayer.nativeElement.play();
	}

	pause() {
		this.audioPlayer.nativeElement.pause();
	}

	stop() {
		this.currentSong = null;
	}

}
