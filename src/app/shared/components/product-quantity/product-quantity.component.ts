import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product.model';
import { ShoppingCart } from '../../models/shopping-cart.model';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent {
  @Input() product: Product;
  @Input() cart: ShoppingCart;

  constructor(
    private cartService: ShoppingCartService
  ) { }

  async addToCart() {
    await this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

}
