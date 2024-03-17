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
  private apiUrl = 'http://localhost:3000'; // Update with your Node.js server URL
  roomId: string = '';
  userId: string = '';
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
    console.log(JSON.stringify(this.store.state));

    return this.http.post<string>(`${this.apiUrl}/createRoom`, {
      data: JSON.stringify(this.store.state),
    });
  }

  getRoomData(roomId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/room/${roomId}`);
  }

  notifyChanges(action: Action) {
    if (this.roomId != '' && this.socket.socketInitialized)
      this.socket.updateData(this.roomId, this.userId, action);
  }

  syncCloudData(data: IAppState) {
    this.store.loadCloudState(data);
  }
}
