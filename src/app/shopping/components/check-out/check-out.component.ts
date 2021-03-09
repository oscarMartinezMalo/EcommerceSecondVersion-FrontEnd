import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor(
    private shoppingCart: ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.cart$ = this.shoppingCart.cart$;
    this.shoppingCart.getCart();
  }
}
