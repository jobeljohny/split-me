import { ChartData } from 'chart.js';
import { Profile } from './profile';
import { Graphs } from './constants';
import { pages } from '../components/Help-Page/help-dialog/help-page-utils';
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
  graph: IgraphType;
  chartData: ChartData<'doughnut'>;
  centerText: string;
}

export interface IgraphType {
  name: Graphs;
  title: string;
}

export interface IPageData {
  page: pages;
}

export interface IBillEntry {
  item: string;
  amount: number;
  quantity?:number;
}
