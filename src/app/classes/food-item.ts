import { Participant } from './participant';
import { getID } from './uuid';

export class FoodItem {
  id: string;
  name: string;
  public logo: string = '🍽️';
  price: number;
  participants: Participant[];

  constructor(name: string, price: number, participants: Participant[],id:string = getID()) {
   
    this.id = id;
    this.name = name;
    this.price = price;
    this.participants = participants;
  }

  get ID() {
    return 'consumer-list-' + this.id;
  }
  get foodID() {
    return this.id;
  }

  public get totalContributions(): number {
    let total: number = 0;
    this.participants.forEach((participant) => {
      total += participant.contribution;
    });

    return Math.round(total * 100) / 100;
  }
  public updatePrices() {
    this.participants.forEach((participant) => {
      participant.contribution = this.price;
    });
  }

  public addParticipant(participant: Participant) {
    let isExist = false;
    this.participants.forEach((p) => {
      if (p.profile.name === participant.profile.name) {
        isExist = true;
        //participant already exists
      }
    });
    if (!isExist) this.participants.push(participant);
  }

  public removeAllParticipants() {
    this.participants = [];
  }

  public resetDefaultPrice() {
    this.participants.forEach((participant) => {
      participant.contribution = this.price;
    });
  }

  public splitEvenly() {
    let splitPrice =
      Math.round((this.price / this.participants.length) * 100) / 100;
    this.participants.forEach((participant) => {
      participant.contribution = splitPrice;
    });
  }
}
