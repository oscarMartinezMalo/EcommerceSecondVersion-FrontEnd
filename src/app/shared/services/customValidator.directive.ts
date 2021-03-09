import { ValidatorFn, AbstractControl } from '@angular/forms';

export function forbiddenNameValidator(): ValidatorFn {

  let  regex: RegExp;
    // tslint:disable-next-line:max-line-length
  regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return (control: AbstractControl): { [key: string]: any } | null => {

    const forbidden = regex.test(control.value);
    return forbidden ? null : { email: { value: control.value } } ;
  };
}

export function phoneNumberValidator(): ValidatorFn {

  let  regex: RegExp;
    // tslint:disable-next-line:max-line-length
  regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  return (control: AbstractControl): { [key: string]: any } | null => {

    const forbidden = regex.test(control.value);
    return forbidden ? null : { phone: { value: control.value } } ;
  }
}