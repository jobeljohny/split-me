import { ChartData } from 'chart.js';
import { Profile } from './profile';
export interface IContributors {
  name: string;
  food_amount: number;
  split_amount: number;
}

export interface IorderDetails {
  food_name: string;
  contribution: number;
  quantity: number;
}

export interface selectionStatus {
  profile: Profile;
  status: boolean;
}

export interface CustomContributionToggler {
  symbol: string;
  description: string;
}

export interface DoughnutEntries {
  item: string;
  value: number;
}

export interface IgraphData {
  chartData: ChartData<'doughnut'>;
  centerText: string;
}

export interface IgraphType {
  index: number;
  graph: string;
}
