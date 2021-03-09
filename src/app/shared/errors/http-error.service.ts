import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {

  constructor(
     private modalService: NgbModal
    ) { }

  displayError() {
    this.openPopUp();
  }

  async openPopUp() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.title = 'Warning';
    modalRef.componentInstance.message = 'To Access, please Login!!';
  }
}
