import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { FoodItem } from 'src/app/classes/food-item';
import { Profile } from 'src/app/classes/profile';
import { RoomService } from 'src/app/services/room.service';

export interface IAppState {
  profiles: Profile[];
  palettes: FoodItem[];
  tax: number;
  discount: number;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router, private roomService: RoomService) {}

  async initiateShare() {
    try {
      const roomId: any = await lastValueFrom(this.roomService.createRoom());
      this.router.navigate(['/room', roomId.roomId]);
    } catch (error) {
      this.roomService.roomStatus = 'idle';
    }
  }

  exitRoom() {
    this.roomService.exitRoom();
    this.router.navigate(['/']);
  }

  get roomStatus() {
    return this.roomService.roomStatus;
  }
}
