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
  private joined = false;
  private messages = [];

  constructor(private chatService:ChatService) {}

  ngOnInit() {
    //Listen to users joining
    this.chatService.newUserJoined()
      .subscribe(data => {
        console.log('data', data);
        this.messages.push(data);
      });

      //listen to users leaving lobby
      this.chatService.userLeftLobby()
      .subscribe(data => {
        console.log('data', data);
        this.messages.push(data);
      });

  }

  onJoinClick() {
    this.joined = true;
    console.log('username', this.username, this.lobby);
    this.chatService.joinRoom({username: this.username, lobby: this.lobby});
  }

  onLeaveClick() {
    this.chatService.leaveLobby({username: this.username, lobby: this.lobby});
    this.username = '';
    this.lobby = '';
    this.joined = false;
  }
}
