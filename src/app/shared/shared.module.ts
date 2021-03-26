import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ModalComponent } from './components/modal/modal.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AppErrorHandler } from './errors/app-error-handler';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { FileUpdateComponent } from './components/file-update/file-update.component';
import { ToastsContainerComponent } from './components/toasts-container/toasts-container.component';

@NgModule({
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    OrderDetailsComponent,
    ModalComponent,
    ErrorPageComponent,
    ConfirmModalComponent,
    FileUpdateComponent,
    ToastsContainerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    RxReactiveFormsModule,
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    ModalComponent,
    OrderDetailsComponent,
    FormsModule,
    NgbModule,
    ConfirmModalComponent,
    FileUpdateComponent,
    RxReactiveFormsModule,
    ToastsContainerComponent,
    ErrorPageComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
  ]
})
export class SharedModule { }
