import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'shared/models/order.model';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnDestroy {
  orders: Order[];
  subscription: Subscription;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {
    this.subscription = this.authService.user$
      .subscribe(async user => {
        if (!user) { return; }
        this.orders = await orderService.getAllOrders(user.id);
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
