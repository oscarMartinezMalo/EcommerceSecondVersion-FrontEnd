import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';
import { Order } from '../../../shared/models/order.model';
import { slide } from 'src/animations';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  animations: [
    slide
  ]
})
export class MyOrdersComponent implements OnInit {
  orders: Order[];

  constructor(
    private orderService: OrderService
  ) { }

  async ngOnInit(): Promise<void> {
    this.orders = await this.orderService.getMyOrders();
  }

}

