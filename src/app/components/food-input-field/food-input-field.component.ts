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
import { Observable, debounceTime, map, startWith } from 'rxjs';
import { foodItem, foodNames, getLogo } from 'src/app/constants/food-names';

@Component({
  selector: 'app-food-input-field',
  templateUrl: './food-input-field.component.html',
  styleUrls: ['./food-input-field.component.scss'],
})
export class FoodInputFieldComponent implements OnInit {
  foodNames: Observable<foodItem[]>;
  stateCtrl: FormControl = new FormControl();
  private _initialName!: string;
  @ViewChild('dishName') dishName: any;
  @Input('initialName') set initialName(value: string) {
    this._initialName = value;
    if (value && value.startsWith('{socket}')) {
      setTimeout(() => {
        this.stateCtrl.setValue(value.slice(8));
        this.updated();
      });
    }
  }
  @Output('nameUpdate') foodName = new EventEmitter<string>();
  @Output('updateIcon') updateIcon = new EventEmitter<string>();
  @Output('socketUpdate') updateSocket = new EventEmitter<string>();

  constructor(private cdr: ChangeDetectorRef) {
    this.foodNames = this.stateCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterFood(value || ''))
    );
    this.stateCtrl.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.updated();
    });
  }

  get initialName() {
    return this._initialName;
  }

  ngOnInit() {
    if (this.initialName.startsWith('item')) {
      setTimeout(() => {
        this.dishName.nativeElement.select();
      }, 400);
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

    const icon = getLogo(Rawvalue);

    this.updateIcon.emit(icon);
  }

  onBlur() {
    const Rawvalue = this.stateCtrl.getRawValue();
    if (Rawvalue) this.updateSocket.emit(Rawvalue);
  }
}
