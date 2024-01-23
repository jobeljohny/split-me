export enum Graphs {
  COST_CONTRIBUTION,
  DISH_PROPOTION,
}

export enum ReceiptType {
  REGULAR,
  SWIGGY,
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
