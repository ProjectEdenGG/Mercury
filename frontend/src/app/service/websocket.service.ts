import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { BehaviorSubject, delay, retry, retryWhen, tap } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class WebsocketService {
	public socket$: WebSocketSubject<any>
	public reconnecting$: BehaviorSubject<boolean> = new BehaviorSubject(false)

	private reconnectAttempts = 0
	private reconnectDelay = 5000

	connect(uuid: String) {
		this.socket$ = webSocket({
			url: `wss://projecteden.gg/nexus/ws?uuid=${uuid}`,
			openObserver: {
				next: () => {
					console.log('[WebSocket] Connection established');
					this.reconnecting$.next(false)
				},
			},
			closeObserver: {
				next: () => {
					console.log('[WebSocket] Connection closed');
				},
			},
		});

		this.socket$.pipe(
			retryWhen(errors =>
				errors.pipe(
					tap(err => console.error("[WebSocket] error:", err)),
					tap(() => {
						this.reconnecting$.next(true)
						this.reconnectAttempts++;
						console.log(`[WebSocket] Reconnect attempt ${this.reconnectAttempts}...`);
					}),
					delay(this.reconnectDelay)
				)
			)
		).subscribe({
			next: (message) => console.log("[WebSocket] Received message:", message),
			error: (err) => console.error("[WebSocket] Failed permanently:", err),
			complete: () => console.log("[WebSocket] Disconnected")
		});
	}

	disconnect() {
		this.socket$?.unsubscribe()
		this.socket$ = undefined;
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
