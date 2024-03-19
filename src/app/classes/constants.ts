export enum Graphs {
  COST_CONTRIBUTION,
  DISH_PROPOTION,
}

export enum ReceiptType {
  REGULAR,
  SWIGGY,
}

export enum ActionType {
  DEFAULT,
  ADD_PROFILE,
  REMOVE_PROFILE,
  ADD_PALETTE,
  REMOVE_PALETTE,
  ADD_PARTICIPANT,
  REMOVE_PARTICIPANT,
  UPDATE_DISH_PRICE,
  UPDATE_PARTICIPANT_PRICE,
  UPDATE_TAX_DISCOUNT,
  UPDATE_PALETTE_FOODNAME,
  SPLIT_EVENLY,
  RESET_PALETTE_DEFAULT_PRICE,
  CLEAR_PALETTE_PARTICIPANTS,
  SCAN_RECEIPT_ACTION,
}

export interface Action {
  type: ActionType;
  payload: any;
}

export const DOMAIN_NAME = 'splitme.in';

export const TESS_WHITELIST =
  'abcdefghijklmnopqrstuvwxyz' +
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
  '0123456789' +
  ' .()';

export const billFilters: string[] = [
  'total',
  'round',
  'gst',
  'discount',
  'tax',
  'charges',
  'service',
];
