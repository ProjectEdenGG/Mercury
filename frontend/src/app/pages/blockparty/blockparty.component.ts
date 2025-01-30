import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {MercuryComponent} from '../../lifecycle/MercuryComponent';
import {takeUntil} from 'rxjs';
import {WebsocketService} from '../../service/websocket.service';
import {ActivatedRoute} from '@angular/router';

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
	joined = false;
	currentSong: Song;
	id: String;
	block: String

	constructor(
		private wsService: WebsocketService,
		private route: ActivatedRoute,
		private cdr: ChangeDetectorRef,
	) {
		super()
	}

	override ngOnInit() {
		const paramId = this.route.snapshot.queryParamMap.get('id');
		this.id = paramId && paramId.trim() !== '' ? paramId : 'test';
	}

	join() {
		this.joined = true;

		this.wsService.getMessages().pipe(takeUntil(this.lifecycle().unsubscriber$)).subscribe(messages => {
			for (let message of messages) {
				if (message.id !== this.id)
					continue;

				if (message.song) {
					this.currentSong = message.song as Song;
					this.cdr.detectChanges();
				}
				if (message.action === 'play')
					this.play();
				else if (message.action === 'pause')
					this.pause();
				else if (message.action === 'stop')
					this.stop();
				else if (message.action === 'block')
					this.block = message.block
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
