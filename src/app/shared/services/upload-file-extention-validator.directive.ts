import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appUploadFileExtentionValidator]'
})
export class UploadFileExtentionValidatorDirective {

  constructor(private el: ElementRef) {
    console.log('constructed InputTextFilterDirective');
  }

  @HostListener('change', ['$event.target'])
  onChange(target) {
    console.log('in change InputTextFilterDirective', target.files[0]);

    (this.el.nativeElement as HTMLInputElement).value.trim();
  }
}
