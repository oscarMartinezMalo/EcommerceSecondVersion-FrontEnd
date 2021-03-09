import { Product } from './product.model';
import { Item } from './item.model';
import { ShippingFormComponent } from 'src/app/shopping/components/shipping-form/shipping-form.component';

export class ShoppingCart {

  shipping = 20;
  constructor(public items: Item[]) { }

  getQuantity(product: Product) {
    const cartItem = this.items.find(item => {
      return item.product.id === product.id;
    });
    return cartItem ? cartItem.quantity : 0;
  }

  get totalItemsCount() {
    let count = 0;
    this.items.forEach(quant => count += quant.quantity);
    return count;
  }

  get totalPrice() {
    let total = 0;
    this.items.forEach(item => { total += item.totalPrice; });
    return total;
  }
  
  get taxes() {
    return Math.ceil((this.totalPrice + this.shipping) * 0.07);
  }

  get totalPriceTaxesShipping(){
    return this.totalPrice + this.taxes + this.shipping;
  }
}



