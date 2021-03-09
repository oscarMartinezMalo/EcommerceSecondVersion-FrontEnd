import { Component, Input, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent {
  categories$;
  @Input() public category: string;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll();
  }

}
