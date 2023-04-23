import { IorderDetails } from './interfaces';

export class IndividualSummary {
  name: string;
  orderDetails: IorderDetails[];
  total: number;
  final_amt: number;
  constructor(
    name: string,
    orderDetails: IorderDetails[],
    total: number,
    final_amt: number
  ) {
    this.name = name;
    this.orderDetails = orderDetails;
    this.total = total;
    this.final_amt = final_amt;
  }
}
