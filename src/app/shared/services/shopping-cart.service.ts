import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../models/product.model';
import { take } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart.model';
import { Item } from 'shared/models/item.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  readonly BASE_URL = `${environment.baseUrl}cart/`;
  cart$ = new Subject<ShoppingCart>();

  constructor(
    private http: HttpClient
  ) { }

  async getCart() {
    const cartId = await this.getOrCreateCartId();

    this.http.get(this.BASE_URL + cartId)
    .pipe(take(1))
    .subscribe(cart => {
      const newCart = this.createShoppingCart(cart);
      this.cart$.next(newCart);
    });
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.http.delete(this.BASE_URL + cartId)
    .pipe(take(1))
    .subscribe(cart => {
      const newCart = this.createShoppingCart(cart);
      this.cart$.next(newCart);
    });
  }

  private async create() {
    return this.http.get(this.BASE_URL + 'create').toPromise() as Promise<{ id: string }>;
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }

    cartId = (await this.create()).id;
    localStorage.setItem('cartId', cartId);
    return cartId;
  }

  private async updateItemQuantity(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    this.http.post(this.BASE_URL + 'update-item-quantity', { cartId, product, change })
    .pipe(take(1))
    .subscribe(cart => {
      const newCart = this.createShoppingCart(cart);
      this.cart$.next(newCart);
    });
  }

  private createShoppingCart(cart) {
    const items = [];

    if( cart ) {
      // Add items to the items list
      for (const cartItem of cart.items) {
        const item = new Item(cartItem.quantity, cartItem.product);
        items.push(item);
      }
    }

    return new ShoppingCart(items);
  }

  // getItem(cartId: string, productId: string) {
  //   return this.http.post(this.BASE_URL, { cartId, productId });
  // }
}
