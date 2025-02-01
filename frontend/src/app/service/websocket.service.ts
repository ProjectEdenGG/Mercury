import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
	providedIn: 'root'
})
export class WebsocketService {
	private socket$: WebSocketSubject<any>;

	connect(uuid: String) {
		this.socket$ = webSocket({
			url: `wss://projecteden.gg/nexus/ws?uuid=${uuid}`,
			openObserver: {
				next: () => {
					console.log('websocket connection established');
				},
			},
			closeObserver: {
				next: () => {
					console.log('websocket connection closed');
				},
			},
		});

		this.socket$.subscribe({
			next: next => {
				console.log('websocket next', next)
			},
			error: (error: any) => {
				console.error("websocket error", error)
			},
			complete: () => {
				console.log('websocket complete')
			}
		})
	}

	disconnect() {
		this.socket$?.unsubscribe()
		this.socket$ = null;
	}

	sendMessage(message: any) {
		this.socket$.next(message);
	}

	getMessages() {
		return this.socket$;
	}

	isConnected() {
		return this.socket$ !== undefined;
	}
}
