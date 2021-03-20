import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../models/shopping-cart.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: Product;
  @Input() showActions: false;
  @Input() cart: ShoppingCart;

  constructor(
    private cartService: ShoppingCartService
  ) {}

  async addToCart() {
    await this.cartService.addToCart(this.product);
  }

}


