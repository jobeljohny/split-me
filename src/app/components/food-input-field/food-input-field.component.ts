import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { foodItem, foodLogo, foodNames } from 'src/app/constants/food-names';

@Component({
  selector: 'app-food-input-field',
  templateUrl: './food-input-field.component.html',
  styleUrls: ['./food-input-field.component.scss'],
})
export class FoodInputFieldComponent implements OnInit {
  foodNames: Observable<foodItem[]>;
  stateCtrl: FormControl = new FormControl();
  @ViewChild('dishName') dishName: any;
  @Input('initialName') initialName!: string;
  @Output('nameUpdate') foodName = new EventEmitter<string>();
  @Output('updateIcon') updateIcon = new EventEmitter<string>();
  constructor() {
    this.foodNames = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterFood(value || ''))
    );
  }

  ngOnInit() {
    if (this.initialName.startsWith('item')) {
      setTimeout(() => {
        this.dishName.nativeElement.select();
      }, 50);
    } else {
      this.stateCtrl.setValue(this.initialName);
      this.updated();
    }
  }

  private filterFood(value: string): foodItem[] {
    if (value != '') this.foodName.emit(value);
    const filterValue = value.toLowerCase();
    return foodNames
      .filter((food) => food.name.toLowerCase().includes(filterValue))
      .slice(0, 5);
  }

  updated() {
    //logo check
    const Rawvalue = this.stateCtrl.getRawValue();
    if (!Rawvalue) return;
    let icon = '🍽️';
    const value = Rawvalue.toLowerCase();
    let item = foodNames.find(
      (fooditem) => fooditem.name.toLowerCase() == value
    );
    if (item) {
      icon = item.icon;
    }

    //keyword search
    const searchKeywords = value.split(' ');

    for (const keyword of searchKeywords) {
      const matchingFoodItem = foodLogo.find((foodItem) =>
        foodItem.name
          .split('|')
          .some((namePart) => namePart.toLowerCase() === keyword)
      );

      if (matchingFoodItem) {
        icon = matchingFoodItem.icon;
      }
    }

    this.updateIcon.emit(icon);
  }
}
