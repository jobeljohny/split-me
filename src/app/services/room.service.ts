import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAppState } from '../components/header/header.component';
import { SocketService } from './socket.service';
import { StoreService } from './store.service';
import { Action } from '../classes/constants';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  roomStatus: string = 'idle';
  private apiUrl = 'https://node-sharehub.onrender.com'; // Update with your Node.js server URL
  //private apiUrl = 'http://localhost:3000';
  roomId: string = '';
  constructor(
    private http: HttpClient,
    private store: StoreService,
    private socket: SocketService
  ) {
    this.store.state$.subscribe((action) => {
      this.notifyChanges(action);
    });
  }

  createRoom(): Observable<string> {
    this.roomStatus = 'connecting';
    console.log(JSON.stringify(this.store.state));
    return this.http.post<string>(`${this.apiUrl}/createRoom`, {
      data: JSON.stringify(this.store.state),
    });
  }

  getRoomData(roomId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/room/${roomId}`);
  }
  
  exitRoom(){
    this.roomStatus = 'idle';
    this.store.clearState();
  }

  notifyChanges(action: Action) {
    if (this.roomId != '' && this.socket.socketInitialized)
      this.socket.updateData(this.roomId, action);
  }

  syncCloudData(data: IAppState) {
    this.store.loadCloudState(data);
  }
}
