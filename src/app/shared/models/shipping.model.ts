import { EmailValidator } from "@angular/forms";

export interface Shipping {
  name: string;
  address: string;
  apartment: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  phone:  number;
  email: string;
}
