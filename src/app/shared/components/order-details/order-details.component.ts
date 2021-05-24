import { Component, ViewChild, ElementRef } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {
  order: Order;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
  ) {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.orderService.getOrderById(orderId).then(order => { this.order = order;
      console.log(order) });
    }
  }

  get totalPrice() {
    let total = 0;
    this.order.items.forEach(item => { total += item.totalPrice; });
    return total;
  }
}
