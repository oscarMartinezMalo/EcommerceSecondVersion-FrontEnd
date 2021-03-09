import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../../../shared/models/shopping-cart.model';
import { slide } from 'src/animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from 'shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  animations: [slide]
})
export class ShoppingCartComponent {
  cart$: Observable<ShoppingCart>;

  constructor(
    public shoppingCartService: ShoppingCartService,
    private modalService: NgbModal
  ) {
    this.cart$ = shoppingCartService.cart$;
    this.shoppingCartService.getCart();
  }

  async clearCart() {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.title = 'Confirmation Alert';
    modalRef.componentInstance.message = 'Are you sure you want to clear your shopping cart?';
    if ( await modalRef.result ) this.shoppingCartService.clearCart();
  }

}
