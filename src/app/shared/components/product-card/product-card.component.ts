import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../models/shopping-cart.model';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  providers: [NgbCarouselConfig]
})
export class ProductCardComponent {
  @Input() product: Product;
  @Input() showActions: false;
  @Input() cart: ShoppingCart;

  constructor(
    private cartService: ShoppingCartService,
    config: NgbCarouselConfig
  ) {
    config.interval = 1000000;
    config.keyboard = true;
  }

  async addToCart() {
    await this.cartService.addToCart(this.product);
  }

}
