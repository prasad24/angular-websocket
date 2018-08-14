import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private username = '';
  private lobby = '';
  private message = '';
  private joined = false;
  private messages = [];
  private users = [];

  constructor(private chatService:ChatService) {}

  ngOnInit() {
    //Listen to users joining
    this.chatService.newUserJoined()
      .subscribe(data => {
        console.log('newuser', data);
        this.users = data.users;
        this.messages.push(data);
      });

      //listen to users leaving lobby
      this.chatService.userLeftLobby()
      .subscribe(data => {
        this.users = data.users;
        this.messages.push(data);
      });

      //listen to new messages in the lobby
      this.chatService.newMessage()
      .subscribe(data => {
        this.messages.push(data);
      });
  }

  onJoinClick() {
    this.joined = true;
    this.chatService.joinRoom({username: this.username, lobby: this.lobby});
  }

  onLeaveClick() {
    this.chatService.leaveLobby({username: this.username, lobby: this.lobby});
    this.username = '';
    this.lobby = '';
    this.joined = false;
    this.messages = [];
  }

  sendMessage() {
    this.chatService.sendMessage({
      username: this.username,
      lobby: this.lobby,
      message: this.message
    });
    this.message = '';
  }

  messageColor(user) {
    return {
      color: user === this.username ? 'black' : 'green'
    }
  }
}
