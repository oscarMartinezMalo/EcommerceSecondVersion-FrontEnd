import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, HostListener, Input, OnChanges, OnDestroy,  } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { FileUrl } from './fileUrl.model';

@Component({
  selector: 'app-file-update',
  templateUrl: './file-update.component.html',
  styleUrls: ['./file-update.component.scss']
})
export class FileUpdateComponent implements OnChanges  {
  @Output() newItemEvent = new EventEmitter<FileUrl[]>();
  @Input() imageList: string[];
  @ViewChild('addImage') addImage: ElementRef;
  @ViewChild('rowImages', { read: ElementRef }) rowImages: ElementRef;

  imageAddUrl = './assets/addProduct.png';
  fileList: FileUrl[] = [];
  scrollShowing = false;
  validFileExtensions = ['jpg', 'jpeg', 'png', 'gif'];

  constructor(
    private modalService: NgbModal
    ) { }

  ngOnChanges(changes) {
    if (changes.imageList && this.fileList.length === 0) {
      changes.imageList.currentValue?.forEach(imgUrl => {
        this.fileList.push({file: null, imageUrl: imgUrl});
       });
    }

    this.showPrevNextButtons();
  }

  showPrevNextButtons() {
    // Wait until the View is Completed to show the previous and next button if scrollBar is visible
      setTimeout(() => {
        const ow = this.rowImages?.nativeElement.offsetWidth;
        const sw = this.rowImages?.nativeElement.scrollWidth;
        this.scrollShowing = (sw > ow) ? true : false;
      }, 50);
  }

  async onFileSelected(event) {
    const fileSelected = event.target.files[0];

    // Validate the file extension and show a message if is not a correct extension
    if ( !this.isValidFileExtension(fileSelected)) {
      const modalRef = this.modalService.open(ModalComponent);
      modalRef.componentInstance.title = 'Warning';
      modalRef.componentInstance.message = 'Please select a Picture with one of the follow formats jpg, jpeg, png or gif';
      return;
    }

    const imageUrl = await this.parseFile(fileSelected) as string;

    this.fileList.push({ file: fileSelected, imageUrl });

    this.newItemEvent.emit(this.fileList); // Emit Event to capture in the parent Component

    this.addImage.nativeElement.value = ''; // Reset File Input to allow the submittion of the same file multiple times.

    await this.showPrevNextButtons(); // Show Previous and Next buttons when the scrollbar is visible

    // Scroll Right
    setTimeout(() => {
      this.rowImages.nativeElement.scrollLeft = this.rowImages.nativeElement.scrollWidth - this.rowImages.nativeElement.clientWidth;
    }, 60);
  }

  isValidFileExtension(fileSelected: any): boolean {
    const fileExtesion = fileSelected.type.split('/');
    if (!fileExtesion || fileExtesion.length < 1) {  return false; }
    if ( this.validFileExtensions.indexOf(fileExtesion[1]) === -1) { return false; }

    return true;
  }

  parseFile(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const result = e.target.result;
        resolve(result);
      };

      reader.onerror = function(e: any) {
        reject(e);
      };
      reader.readAsDataURL(file);
    });
  }

  onDeleteImage(index: number) {
    this.fileList.splice(index, 1);
    this.newItemEvent.emit(this.fileList);

    this.showPrevNextButtons(); // Show Previous and Next buttons when the scrollbar is visible
  }

  onNext() {
    const imagesContainerWidth = this.rowImages.nativeElement.offsetWidth;
    this.rowImages.nativeElement.scrollTo({ left: (this.rowImages.nativeElement.scrollLeft + imagesContainerWidth), behavior: 'smooth' });
  }

  onPrevious() {
    const imagesContainerWidth = this.rowImages.nativeElement.offsetWidth;
    this.rowImages.nativeElement.scrollTo({ left: (this.rowImages.nativeElement.scrollLeft - imagesContainerWidth), behavior: 'smooth' });
  }
}


