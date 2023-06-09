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
