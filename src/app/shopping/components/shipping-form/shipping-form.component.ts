import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Order } from '../../../shared/models/order.model';
import { ShoppingCart } from '../../../shared/models/shopping-cart.model';
import { User } from 'shared/models/user.model';
import { Shipping } from 'shared/models/shipping.model';
import { FormBuilder, Validators } from '@angular/forms';
import { forbiddenNameValidator, phoneNumberValidator } from 'shared/services/customValidator.directive';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent {
  @Input() cart: ShoppingCart;
  @ViewChild('paypal', { static: true }) paypalRef: ElementRef;

  user: User;

  shippingForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(40)]],
    address: ['', [Validators.required]],
    apartment: [''],
    zipCode: ['', [Validators.required, Validators.max(99999)]],
    city: ['', [Validators.required]],
    state: ['FL', [Validators.required]],
    country: ['US', [Validators.required]],
    phone: ['', [Validators.required, , phoneNumberValidator()]],
    email: ['', [Validators.required, , forbiddenNameValidator(),]],
  });

  states:{name: string, abbreviation:string}[] = [
      {name: "Alabama", abbreviation: "AL"},{name: "Alaska", abbreviation: "AK"},{name: "American Samoa", abbreviation: "AS"},
      {name: "Arizona", abbreviation: "AZ"},{name: "Arkansas", abbreviation: "AR"},{name: "California", abbreviation: "CA"},
      {name: "Colorado", abbreviation: "CO"},{name: "Connecticut", abbreviation: "CT"},{name: "Delaware", abbreviation: "DE"},
      {name: "District Of Columbia", abbreviation: "DC"},{name: "Federated States Of Micronesia", abbreviation: "FM"},
      {name: "Florida", abbreviation: "FL"},{name: "Georgia", abbreviation: "GA"},{name: "Guam", abbreviation: "GU"},
      {name: "Hawaii", abbreviation: "HI"},{name: "Idaho", abbreviation: "ID"},{name: "Illinois", abbreviation: "IL"},
      {name: "Indiana", abbreviation: "IN"},{name: "Iowa", abbreviation: "IA"},{name: "Kansas", abbreviation: "KS"},
      {name: "Kentucky", abbreviation: "KY"},{name: "Louisiana", abbreviation: "LA"},{name: "Maine", abbreviation: "ME"},
      {name: "Marshall Islands", abbreviation: "MH"},{name: "Maryland", abbreviation: "MD"},{name: "Massachusetts", abbreviation: "MA"},
      {name: "Michigan", abbreviation: "MI"},{name: "Minnesota", abbreviation: "MN"},{name: "Mississippi", abbreviation: "MS"},
      {name: "Missouri", abbreviation: "MO"},{name: "Montana", abbreviation: "MT"},{name: "Nebraska", abbreviation: "NE"},
      {name: "Nevada", abbreviation: "NV"},{name: "New Hampshire", abbreviation: "NH"},{name: "New Jersey", abbreviation: "NJ"},
      {name: "New Mexico", abbreviation: "NM"},{name: "New York", abbreviation: "NY"},{name: "North Carolina", abbreviation: "NC"},
      {name: "North Dakota", abbreviation: "ND"},{name: "Northern Mariana Islands", abbreviation: "MP"},
      {name: "Ohio", abbreviation: "OH"},{name: "Oklahoma", abbreviation: "OK"},{name: "Oregon", abbreviation: "OR"},
      {name: "Palau", abbreviation: "PW"},{name: "Pennsylvania", abbreviation: "PA"},{name: "Puerto Rico", abbreviation: "PR"},
      {name: "Rhode Island", abbreviation: "RI"},{name: "South Carolina", abbreviation: "SC"},{name: "South Dakota", abbreviation: "SD"},
      {name: "Tennessee", abbreviation: "TN"},{name: "Texas", abbreviation: "TX"},{name: "Utah", abbreviation: "UT"},
      {name: "Vermont", abbreviation: "VT"},{name: "Virgin Islands", abbreviation: "VI"},{name: "Virginia", abbreviation: "VA"},
      {name: "Washington", abbreviation: "WA"},{name: "West Virginia", abbreviation: "WV"},{name: "Wisconsin", abbreviation: "WI"},
      {name: "Wyoming", abbreviation: "WY"}
  ]

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.user$.pipe(take(1)).subscribe(user => this.user = user);
  }

 async onSubmit(){
   this.shippingForm.markAllAsTouched();
    if(this.shippingForm.valid && this.shippingForm.touched) {
      const order = new Order(this.user.id, this.shippingForm.value, this.cart);
      
   console.log("CartHEr",order);
      await this.orderService.loadPaypalOrder(order);  // Store the order in the service
      // Check for Errors here
      this.router.navigate(['/secure-checkout']);
      // if (window.open(res.paypalUrl, '_blank', 'toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=600,height=800') == null) {
      // if (window.open(res, '_self') == null) {
      //   alert('Please desactive the popup blocker');
      // }
      // this.router.navigate(['/order-success', result.id]);
    }
  }
}
