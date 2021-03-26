import { Component, TemplateRef } from '@angular/core';
import { ToastService } from 'shared/toast.service';

@Component({
  selector: 'app-toasts-container',
  templateUrl: './toasts-container.component.html',
  // tslint:disable-next-line:no-host-metadata-property
  host: { '[class.ngb-toasts]': 'true' },
  styleUrls: ['./toasts-container.component.scss']
})
export class ToastsContainerComponent {
  show = true;

  constructor(public toastService: ToastService) { }

  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }

  close() {
    this.show = false;
  }
}
