export class FoodItem {
  static #id = 0;
  private id: number;
  name: string;
  price: number;
  participants: number[];

  static #incrementID() {
    this.#id++;
  }

  constructor(name: string, price: number, participants: number[]) {
    if (name !== 'undefined') {
      FoodItem.#incrementID();
      this.id = FoodItem.#id;
    } else this.id = 0;

    this.name = name;
    this.price = price;
    this.participants = participants;
  }

  get ID() {
    return 'consumer-list-' + this.id;
  }
}
