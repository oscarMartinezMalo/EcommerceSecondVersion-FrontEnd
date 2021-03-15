import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { ProductService } from 'shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from 'shared/models/product.model';
import { FileUrl } from 'shared/components/file-update/fileUrl.model';
import { file } from '@rxweb/reactive-form-validators';
import { HttpErrorService } from 'shared/errors/http-error.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'shared/components/modal/modal.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent{
  categories$;
  product: Product = {};
  id: string;
  fileList: FileUrl[]= [];
  imageArray: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService,
    private modalService: NgbModal
    ) {
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if ( this.id ) {
      this.productService.getById(this.id).pipe(take(1)).subscribe( p =>{
        this.product = p;
      } );
    }
  }

  async onSave( product: Product) {
    if (this.fileList.length < 1) {
      const modalRef = this.modalService.open(ModalComponent);
      modalRef.componentInstance.title = 'Warning';
      modalRef.componentInstance.message = 'You have to select at least one Image';
      return;
    }

    // Submit the form as FormData to also send files
    const formData = new FormData();
    formData.append('title', product.title);
    formData.append('price', product.price.toString());
    formData.append('category', product.category );
    formData.append('imageUrl', product.imageUrl);
    // Add the files that were attach to the formData
    this.fileList.forEach(fileObj =>{  if(fileObj.file) { formData.append('files', fileObj.file, fileObj.file.name); } });

    if ( this.id ) {
      // Filter the URLs that came from the BackEnd to check if the user delete some picture
      this.fileList.map( fileObj =>{ if(fileObj.file == null) { formData.append('imagesUrls', fileObj.imageUrl); } });
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

  onFileChange(event) {
    this.fileList = event;
  }
}
