import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from 'shared/models/product.model';
import { FileUrl } from 'shared/components/file-update/fileUrl.model';

@Component({
  selector: 'app-product-form-file',
  templateUrl: './product-form-file.component.html',
  styleUrls: ['./product-form-file.component.scss']
})
export class ProductFormFileComponent implements OnInit {
  categories$;
  product: Product = {};
  id: string;
  fileList: FileUrl[]= [];

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
  }

  ngOnInit(): void { }

  async onSave( product: Product) {    
    if(this.fileList.length < 1) { alert("You have to select at least one Image"); return; }

    // Submit the form as FormData to also send files
    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('price', product.price.toString());
    formData.append('category', product.category );
    // formData.append('imageUrl', product.imageUrl);
    this.fileList.forEach(fileObj =>{ formData.append('files', fileObj.file, fileObj.file.name); })

    if ( this.id ) {
      await this.productService.update(this.id, formData);
    } else {
      await this.productService.create(formData);
    }
    this.router.navigate(['/admin/products']);
  }

  async delete() {
    if ( confirm('Are you sure you want to delete this product')) {
      await this.productService.delete(this.id);
      this.router.navigate(['/admin/products']);
    }
  }

  getfileList(imagesList: FileUrl[]){    
    console.log('prod', imagesList);
    this.fileList = imagesList;
    this.product.imagesUrls = [];
    imagesList.forEach(fileObj =>{ 
      this.product.imagesUrls.push( fileObj.imageUrl);
     });
  }
}
