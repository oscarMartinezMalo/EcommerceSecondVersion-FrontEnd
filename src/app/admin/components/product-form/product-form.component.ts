import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from 'shared/models/product.model';
import { FileUrl } from 'shared/components/file-update/fileUrl.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product: Product = {};
  id: string;
  fileList: FileUrl[]= [];
  imageArray: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
    ) {
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if ( this.id ) {
      this.productService.getById(this.id).pipe(take(1)).subscribe(p => this.product = p );
    }

    this.imageArray = ['https://image.shutterstock.com/image-photo/pedestrian-bridge-photographer-600w-1083676763.jpg',
    'https://image.shutterstock.com/image-photo/yacht-racing-sport-600w-1077224210.jpg',
    'https://image.shutterstock.com/image-photo/johns-county-ocean-pier-600w-1076201669.jpg',
    'https://image.shutterstock.com/image-photo/triumphal-arch-below-600w-1079227055.jpg']
  }

  ngOnInit(): void { }

  async onSave( product: Product) {    
    if(this.fileList.length < 1) { alert("You have to select at least one Image"); return; }

    // Submit the form as FormData to also send files
    // const formData = new FormData();
    // formData.append('title', product.title);
    // formData.append('price', product.price.toString());
    // formData.append('category', product.category );
    // formData.append('imageUrl', product.imageUrl);
    // this.fileList.forEach(fileObj =>{ formData.append('files', fileObj.file, fileObj.file.name); })

    if ( this.id ) {
      await this.productService.update(this.id, product);
    } else {
      await this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  async delete() {
    if ( confirm('Are you sure you want to delete this product')) {
      await this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

  onFileChange(event) {
    this.fileList = event;
  }
}