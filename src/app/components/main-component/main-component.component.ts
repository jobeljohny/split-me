import { Component, OnInit } from '@angular/core';
import { IAppState } from '../header/header.component';
import { SocketService } from 'src/app/services/socket.service';
import { RoomService } from 'src/app/services/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { getID } from 'src/app/classes/uuid';
import { MatDialog } from '@angular/material/dialog';
import { NicknameModalComponent } from '../nickname-modal/nickname-modal.component';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrls: ['./main-component.component.scss'],
})
export class MainComponentComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private socket: SocketService,
    public dialog: MatDialog,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('roomId');

    if (roomId) {
      //check user id exist
      let dialogRef = this.dialog.open(NicknameModalComponent, {
        width: '350px',
        data: roomId,
        disableClose: true,
        panelClass: 'split-me-modal',
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.joinRoom(roomId, result);
        }
      });
    }
  }
  async joinRoom(roomId: string, username: string) {
    const userId = getID();
    this.socket.initSocket();
    this.socket.joinRoom(roomId, userId, username); // Join the room for real-time updates
    this.roomService.roomId = roomId;
    this.roomService.roomStatus = 'connected';
    try {
      const data: IAppState = await lastValueFrom(
        this.roomService.getRoomData(roomId)
      );
      if (data) {
        this.roomService.syncCloudData(data);
        this.toast.success(`Connected to room - ${roomId}`, 'Connected', {
          titleClass: 'socket-title',
          toastClass: 'socket-toast',
          timeOut: 3000,
        });
      } else {
        this.toast.error('Cannot connect to specified room', 'Invalid Room');
        this.router.navigate(['/']);
      }
    } catch (error) {
      this.toast.error('Error occurred while connecting to room');
    }
  }
}
