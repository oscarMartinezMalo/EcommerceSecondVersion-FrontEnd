import { Product } from './product.model';

export class Item {
  constructor(public quantity: number, public product: Product) { }
  get totalPrice() { return this.product.price * this.quantity; }
}
