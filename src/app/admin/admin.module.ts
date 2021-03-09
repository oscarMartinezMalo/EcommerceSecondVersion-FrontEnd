import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';

import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { OrderDetailsComponent } from 'shared/components/order-details/order-details.component';
import { ProductFormFileComponent } from './components/product-form-file/product-form-file.component';

@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    ProductFormFileComponent
  ],
  providers: [
    AdminAuthGuard,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      // { path: 'admin', children: [
        { path: 'products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
        { path: 'products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
        { path: 'products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
        { path: 'orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] },
        { path: 'orders/:id', component: OrderDetailsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
        { path: 'products-reactive/new', component: ProductFormFileComponent, canActivate: [AuthGuard, AdminAuthGuard] },
        { path: 'products-reactive/:id', component: ProductFormFileComponent, canActivate: [AuthGuard, AdminAuthGuard] }
      // ] }
    ])
  ]
})
export class AdminModule { }