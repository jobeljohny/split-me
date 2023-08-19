import {
  AfterViewInit,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { foodItem, foodNames } from 'src/app/constants/food-names';

@Component({
  selector: 'app-food-input-field',
  templateUrl: './food-input-field.component.html',
  styleUrls: ['./food-input-field.component.scss'],
})
export class FoodInputFieldComponent implements AfterViewInit {
  foodNames: Observable<foodItem[]>;
  stateCtrl = new FormControl();
  @ViewChild('dishName') dishName: any;
  @Output('nameUpdate') foodName = new EventEmitter<string>();
  constructor() {
    this.foodNames = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterFood(value || ''))
    );
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dishName.nativeElement.select();
    }, 50);
  }
  private filterFood(value: string): foodItem[] {
    this.foodName.emit(value);
    const filterValue = value.toLowerCase();
    return foodNames
      .filter((food) => food.name.toLowerCase().includes(filterValue))
      .slice(0, 5);
  }
}
