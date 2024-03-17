import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private roomService: RoomService,
  ) {}

  ngOnInit(): void {}

  initiateShare() {
    this.roomService.createRoom().subscribe((roomId: any) => {
      this.router.navigate(['/room', roomId.roomId]);
    });
  }
}
