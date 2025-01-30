import {Injectable} from '@angular/core';
import {WebSocketSubject} from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = new WebSocketSubject('wss://projecteden.gg/nexus/ws');
  }

  sendMessage(message: any) {
    this.socket$.next(message);
  }

  getMessages() {
    return this.socket$;
  }
}
