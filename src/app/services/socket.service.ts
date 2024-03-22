import { Injectable } from '@angular/core';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket, io } from 'socket.io-client';
import { Action } from '../classes/constants';
import { StoreService } from './store.service';
import { ToastrService } from 'ngx-toastr';

export interface IsocketMessage {
  id: ISocketUserInfo;
  action: string;
}

export interface ISocketUserInfo {
  userId: string;
  username: string;
}

export interface ISocketConnInfo {
  id: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket<DefaultEventsMap, DefaultEventsMap>;
  socketInitialized: Boolean = false;

  user: ISocketUserInfo = {
    userId: '',
    username: '',
  };

  constructor(private store: StoreService, private toast: ToastrService) {}

  setUserInfo(id: string, name: string) {
    this.user = { userId: id, username: name };
  }

  initSocket() {
    this.socketInitialized = true;
     this.socket = io('https://node-sharehub.onrender.com');
    //this.socket = io('http://localhost:3000');
    this.socket.on('updateData', (data: IsocketMessage) => {
      if (data.id.userId != this.user.userId) {
        const action: Action = JSON.parse(data.action);
        this.store.handleAction(action,data.id.username);
        console.log(action);
      }
    });
    this.socket.on('connectionInfo', (data: ISocketConnInfo) => {
      if (data.id !== this.user.userId)
        this.toast.info(data.message, undefined, { timeOut: 3000 });
    });
  }

  updateData(roomId: string, data: Action) {
    const jsondata = JSON.stringify(data);
    this.socket.emit('update', { id: roomId, user: this.user, data: jsondata });
  }

  joinRoom(roomId: string, userId: string, username: string) {
    this.setUserInfo(userId, username);
    this.socket.emit('joinRoom', { roomId: roomId, user: this.user });
  }
}
