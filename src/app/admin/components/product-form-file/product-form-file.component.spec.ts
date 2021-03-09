import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormFileComponent } from './product-form-file.component';

describe('ProductFormFileComponent', () => {
  let component: ProductFormFileComponent;
  let fixture: ComponentFixture<ProductFormFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFormFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
