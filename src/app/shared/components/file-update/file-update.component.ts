import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, HostListener, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FileUrl } from './fileUrl.model';

@Component({
  selector: 'app-file-update',
  templateUrl: './file-update.component.html',
  styleUrls: ['./file-update.component.scss']
})
export class FileUpdateComponent {
  @Output() newItemEvent = new EventEmitter<FileUrl[]>();
  @Input() imageList: string[];
  imageAddUrl = './assets/addProduct.png';
  fileList: FileUrl[] = [];

  constructor() { }

  ngOnChanges(changes) {
    if(changes.imageList){
      changes.imageList.currentValue?.forEach(imgUrl =>{  
        this.fileList.push({file: null, imageUrl: imgUrl});
       })
    }
  }

  async onFileSelected(event){         
      const fileSelected = event.target.files[0];
      const imageUrl = await this.parseFile(fileSelected) as string; 

      this.fileList.push({file: fileSelected, imageUrl: imageUrl });

      this.newItemEvent.emit(this.fileList);
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
    (<HTMLInputElement>document.getElementById('image-'+ index)).click();
  }
}
