import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product.model';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart.model';
import { Observable } from 'rxjs';
import { fadeEnter } from 'src/animations';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [ fadeEnter ]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[];
  category;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) { }

  async ngOnInit(): Promise<void> {
    this.cart$ = this.shoppingCartService.cart$;
    this.shoppingCartService.getCart();

    this.populateProducts();
  }


  private appyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;
  }

  private populateProducts() {
    this.productService.getAll()
      .pipe(
        switchMap((p: Product[]) => {
          console.log(p);
          this.products = p;
          return this.route.queryParamMap;
        }))
      .subscribe(params => {
        this.category = params.get('category');
        this.appyFilter();
      });
  }
}
