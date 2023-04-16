import { Injectable } from '@angular/core';
import { FoodPaletteService } from './food-palette.service';
import { IContributors } from '../classes/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  tax: number = 0;
  discount: number = 0;
  totalFoodAmount: number = 0;
  finalTotal: number = 0;
  contributorsMap: Map<string, number> | undefined;
  totalAmountMap: Map<string, number> | undefined;
  constructor(private foodPalette: FoodPaletteService) {}

  calculateFinalTotal() {
    this.totalFoodAmount = this.foodPalette.getTotalAmount();
    this.contributorsMap = this.foodPalette.getIndividualContributions();
    this.totalAmountMap = new Map<string, number>();
    let finalAmt: number = 0;
    for (let [name, money] of this.contributorsMap) {
      let taxAmt = (money / this.totalFoodAmount) * this.tax;
      let discAmt = (money / this.totalFoodAmount) * this.discount;

      let newAmount = Math.round((money + taxAmt - discAmt) * 100) / 100;
      finalAmt += money + taxAmt - discAmt;
      this.totalAmountMap.set(name, newAmount);
    }

    this.finalTotal = Math.round(finalAmt * 100) / 100;
  }

  generateDataSourceMap(): IContributors[] {
    let ContributorsMap: IContributors[] = [];
    if (this.contributorsMap && this.totalAmountMap) {
      for (let [name, money] of this.contributorsMap) {
        let entry: IContributors = {
          name: name,
          food_amount: money,
          split_amount: this.totalAmountMap.get(name)!,
        };
        ContributorsMap.push(entry);
      }
    }

    return ContributorsMap;
  }

  getCalculatedAmount() {
    // return the total amount with tax and discount integrated
    this.totalFoodAmount = this.foodPalette.getTotalAmount();
    return (
      Math.round((this.totalFoodAmount + this.tax - this.discount) * 100) / 100
    );
  }

  //utility function
  addbits(s: string): number {
    const regex = /[+\-]?([0-9\.]+)/g;
    const matches = s.replace(/\s/g, '').match(regex) || [];
    let sum = 0;
    for (const val of matches) {
      sum += parseFloat(val);
    }
    return sum;
  }
}
