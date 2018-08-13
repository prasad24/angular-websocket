import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket = io('http://localhost:3000');

  constructor() { }

  joinRoom(data) {
    this.socket.emit('join', data);
  }

  newUserJoined() {
    return new Observable<{username:string, message:string}>(observe => {
      this.socket.on('newuser', data => {
        observe.next(data);
      });
      return () => {this.socket.disconnect();};
    });
  }
}
