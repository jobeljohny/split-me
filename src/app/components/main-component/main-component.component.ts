import { Component, OnInit } from '@angular/core';
import { IAppState } from '../header/header.component';
import { SocketService } from 'src/app/services/socket.service';
import { RoomService } from 'src/app/services/room.service';
import { ActivatedRoute } from '@angular/router';
import { getID } from 'src/app/classes/uuid';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss'],
})
export class MainComponentComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private socket: SocketService
  ) {}

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('roomId');

    if (roomId) {
      const userId = getID();
      this.socket.initSocket();
      this.socket.joinRoom(roomId, userId); // Join the room for real-time updates
      this.roomService.roomId = roomId;
      this.roomService.userId = userId;

      this.roomService.getRoomData(roomId).subscribe((data: IAppState) => {
        if (data) this.roomService.syncCloudData(data);
      });
    }
  }
}
