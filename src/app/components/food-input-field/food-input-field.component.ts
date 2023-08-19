import {
  AfterViewInit,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-food-input-field',
  templateUrl: './food-input-field.component.html',
  styleUrls: ['./food-input-field.component.scss'],
})
export class FoodInputFieldComponent implements AfterViewInit {
  foodNames: Observable<string[]>;
  stateCtrl = new FormControl();
  @ViewChild('dishName') dishName: any;
  @Output('nameUpdate') foodName = new EventEmitter<string>();
  constructor() {
    this.foodNames = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map((state) => (state ? this._filterStates(state) : this.states.slice()))
    );
  }

  states: string[] = ['chicken', 'beef', 'rice', 'mandhi', 'al faham'];
  ngAfterViewInit() {
    setTimeout(() => {
      this.dishName.nativeElement.select();
    }, 50);
  }
  private _filterStates(value: string): string[] {
    this.foodName.emit(value);
    const filterValue = value.toLowerCase();
    console.log(
      this.states.filter(
        (food) => food.toLowerCase().indexOf(filterValue) === 0
      )
    );

    return this.states.filter(
      (food) => food.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
