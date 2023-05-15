import { randomBetween } from './commons';

export class Profile {
  name: string;
  hue: number = 0;
  constructor(name: string) {
    this.name = name;
    this.hue = randomBetween(0, 360);
  }
}
