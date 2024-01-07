import { Injectable } from '@angular/core';
import { FoodPaletteService } from './food-palette.service';
import { DoughnutEntries, IContributors } from '../classes/interfaces';
import { IndividualSummary } from '../classes/individual-summary';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  //TODO reset to 0
  tax: number = 0;
  discount: number = 0;
  totalFoodAmount: number = 0;
  finalTotal: number = 0;
  participantsCount: number = 0;
  dishesCount: number = 0;
  contributorsMap: Map<string, number>;
  totalAmountMap: Map<string, number>;
  individualSummaries: IndividualSummary[] = [];
  constructor(private foodPalette: FoodPaletteService) {
    this.contributorsMap = new Map<string, number>();
    this.totalAmountMap = new Map<string, number>();
  }

  calculateFinalTotal() {
    this.totalFoodAmount = this.foodPalette.getTotalAmount();
    this.contributorsMap = this.foodPalette.getIndividualContributions();
    this.participantsCount = this.contributorsMap.size;
    this.dishesCount = this.foodPalette.palettes.length;
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

  getNameAmountDistribution(): DoughnutEntries[] {
    let dataMap: DoughnutEntries[] = [];

    if (this.contributorsMap && this.totalAmountMap) {
      for (let name of this.contributorsMap.keys()) {
        let entry: DoughnutEntries = {
          item: name,
          value: this.totalAmountMap.get(name)!,
        };
        dataMap.push(entry);
      }
    }
    return dataMap;
  }

  getDishAmountDistribution(): DoughnutEntries[] {
    let dataMap: DoughnutEntries[] = [];
    for (let palette of this.foodPalette.palettes) {
      let entry: DoughnutEntries = {
        item: palette.logo + ' ' + palette.name,
        value: palette.totalContributions,
      };
      dataMap.push(entry);
    }
    return dataMap;
  }

  generateIndividualSummary() {
    let indivualOrders = this.foodPalette.getIndividualOrders();
    this.individualSummaries = [];
    for (let [name, orders] of indivualOrders.entries()) {
      let summary = new IndividualSummary(
        name,
        orders,
        this.contributorsMap.get(name)!,
        this.totalAmountMap.get(name)!
      );
      this.individualSummaries.push(summary);
    }
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
