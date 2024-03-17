import { Injectable } from '@angular/core';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket, io } from 'socket.io-client';
import { Action } from '../classes/constants';
import { StoreService } from './store.service';

export interface IsocketMessage {
  id: string;
  action: string;
}

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket<DefaultEventsMap, DefaultEventsMap>;
  socketInitialized: Boolean = false;
  userId: string = '';

  constructor(private store: StoreService) {}

  initSocket() {
    this.socketInitialized = true;
    this.socket = io('http://localhost:3000');
    this.socket.on('updateData', (data: IsocketMessage) => {
      if (data.id != this.userId) {
        const action: Action = JSON.parse(data.action);
        this.store.handleAction(action);
        console.log(action);
      }
    });
  }

  updateData(roomId: string, userId: string, data: Action) {
    const jsondata = JSON.stringify(data);
    this.socket.emit('update', { id: roomId, userId: userId, data: jsondata });
  }

  joinRoom(roomId: string, userId: string) {
    this.userId = userId;
    this.socket.emit('joinRoom', { roomId: roomId, userId: userId });
  }
}
