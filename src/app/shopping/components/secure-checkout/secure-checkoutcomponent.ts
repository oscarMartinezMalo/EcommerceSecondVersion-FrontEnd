import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart.model';
import { OrderService } from 'shared/services/order.service';
import { Router } from '@angular/router';

declare var paypal;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'secure-checkout',
  templateUrl: './secure-checkout.component.html',
  styleUrls: ['./secure-checkout.component.scss']
})
export class SecureCheckoutComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalRef: ElementRef;
  cart$: Observable<ShoppingCart>;
  spinner = 'none';

  constructor(
    private orderService: OrderService,
    private shoppingCart: ShoppingCartService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    // Show shopping Object //
    this.cart$ = this.shoppingCart.cart$;
    this.shoppingCart.getCart();

    // If the shipping object is not set go to shipping page
    if (!this.orderService.paypalOrder) {
      this.router.navigate(['/check-out']);
    }

    // Get the PaypalOrder Object from orderService
    const purchase_units = this.orderService.paypalOrder.purchase_units;

    paypal.Buttons({
      createOrder(data, actions) {
        // This function sets up the details of the transaction,including the amount and line item details.
        return actions.order.create({ purchase_units });
      },
      onApprove: (data, actions) => {
        this.spinner = 'block';
        // Send the order object to the backend
        this.orderService.storeOrder(data.orderID, data.payerID)
        .subscribe((resp: { orderPaidID: string }) => {
          this.router.navigate(['/order-success', resp.orderPaidID]);
        },
        error => {
          this.spinner = 'none';
          console.log('err', error);
        });
      },
    }).render(this.paypalRef.nativeElement);
  }

}
