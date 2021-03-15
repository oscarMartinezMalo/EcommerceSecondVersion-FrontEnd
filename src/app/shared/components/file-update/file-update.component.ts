import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, HostListener, Input, OnChanges,  } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FileUrl } from './fileUrl.model';

@Component({
  selector: 'app-file-update',
  templateUrl: './file-update.component.html',
  styleUrls: ['./file-update.component.scss']
})
export class FileUpdateComponent implements OnChanges {
  @Output() newItemEvent = new EventEmitter<FileUrl[]>();
  @Input() imageList: string[];
  @ViewChild('addImage') addImage: ElementRef;
  imageAddUrl = './assets/addProduct.png';
  fileList: FileUrl[] = [];
  @ViewChild('rowImages', { read: ElementRef }) rowImages: ElementRef;

  constructor() { }

  ngOnChanges(changes) {
    if (changes.imageList) {
      changes.imageList.currentValue?.forEach(imgUrl =>{
        this.fileList.push({file: null, imageUrl: imgUrl});
       });
    }
  }

  async onFileSelected(event) {
      const fileSelected = event.target.files[0];
      const imageUrl = await this.parseFile(fileSelected) as string;

      this.fileList.push({file: fileSelected, imageUrl });

      this.newItemEvent.emit(this.fileList);

      this.addImage.nativeElement.value = ''; // Reset File Input to allow the submittion of the same file multiple times.
  }

  onDeleteImage(index: number) {
    this.fileList.splice(index, 1);
    this.newItemEvent.emit(this.fileList);
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

  onImageBox( index: number ) {
    (document.getElementById('image-' + index) as HTMLInputElement).click();
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
