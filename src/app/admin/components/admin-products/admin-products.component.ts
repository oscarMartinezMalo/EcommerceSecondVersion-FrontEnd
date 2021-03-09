import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Product } from 'shared/models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filterProducts: Product[];
  subscribtion: Subscription;

  constructor(
    private productService: ProductService
  ) {
    this.subscribtion = this.productService.getAll().subscribe( products => {
      this.products = this.filterProducts = products as Product[];
    });
  }

  filter( query: string) {
    this.filterProducts = (query) ?
    this.products.filter( p => p.title.toLowerCase().includes(query.toLowerCase())) :
    this.products;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

}
