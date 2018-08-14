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

  leaveLobby(data) {
    this.socket.emit('leave', data);
  }

  newUserJoined() {
    return new Observable<{username:string, message:string}>(observe => {
      this.socket.on('newuser', data => {
        observe.next(data);
      });
      return () => {this.socket.disconnect();};
    });
  }

  userLeftLobby() {
    return new Observable<{username:string, message:string}>(observe => {
      this.socket.on('userleft', data => {
        observe.next(data);
      });
      return () => {this.socket.disconnect();};
    });
  }

  sendMessage(data) {
    this.socket.emit('message', data);
  }

  newMessage() {
    return new Observable<{username:string, message:string}>(observe => {
      this.socket.on('message', data => {
        observe.next(data);
      });
      return () => {this.socket.disconnect();};
    });
  }
}
