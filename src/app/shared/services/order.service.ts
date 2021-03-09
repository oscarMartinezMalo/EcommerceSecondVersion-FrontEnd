import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaderResponse } from '@angular/common/http';
import { Order } from 'shared/models/order.model';
import { ShoppingCartService } from './shopping-cart.service';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({  providedIn: 'root' })
export class OrderService {
  readonly BASE_URL = `${environment.baseUrl}orders/`;
  paypalOrder;
  currentOrder: Order;

  constructor(
    private http: HttpClient,
    private shoppingCart: ShoppingCartService
  ) { }

  // If the order capture in the backend is fine Store the order.
  storeOrder(paypalOrderID, paypalPayerID) {
    this.currentOrder.paypalPayerID = paypalPayerID;
    this.currentOrder.paypalOrderID = paypalOrderID;

    // const resp = await this.http.post(this.BASE_URL, this.currentOrder).toPromise() as Promise<{ orderPaidID: string }>;
    const resp = this.http.post(this.BASE_URL, this.currentOrder).pipe(
      map(res => {
        this.shoppingCart.clearCart();
        return res;
      }),
      catchError(this.handleError)
    );

    return resp;
  }

  async loadPaypalOrder(order: Order) {
    this.paypalOrder = await this.http.post(this.BASE_URL + 'paypal-order/', order).toPromise();
    this.currentOrder = order;
  }

  async executeOrder() {
    const orderId = localStorage.getItem('orderId');
    console.log(orderId);
    const resp = await this.http.get(this.BASE_URL + 'execute-order/' + orderId).toPromise();
  }

  async getMyOrders() {
    const result = await this.http.get(this.BASE_URL + 'by-user' ).toPromise() as Promise<Order[]>;
    return result;
  }

  async getAllOrders(userId: string) {
    const result = await this.http.get(this.BASE_URL).toPromise() as Promise<Order[]>;
    return result;
  }

  async getOrderById( orderId: string) {
    const result = await this.http.get(this.BASE_URL + 'by-order-id/' + orderId).toPromise() as Promise<Order>;
    return result;
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error.message || 'Something bad happened; please try again later.');
  }
}
