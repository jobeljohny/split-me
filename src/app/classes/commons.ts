import { formatCurrency } from '@angular/common';

export function randomBetween(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getCurrencyString(amount: number) {
  return formatCurrency(amount, 'en-US', '₹', 'INR', '1.2-2');
}

export const profileSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      hue: { type: 'number' },
      name: { type: 'string' },
    },
    required: ['hue', 'name'],
  },
};

export function getRoomID(): string {
  let outString: string = '';
  let inOptions: string = 'abcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < 6; i++) {
    outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
  }
  return outString;
}
