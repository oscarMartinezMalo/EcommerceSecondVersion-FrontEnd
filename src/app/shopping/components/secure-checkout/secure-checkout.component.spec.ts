import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SecureCheckoutComponent } from './secure-checkoutcomponent';

describe('SecureCheckoutComponent', () => {
  let component: SecureCheckoutComponent;
  let fixture: ComponentFixture<SecureCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecureCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
