import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FileUrl } from './fileUrl.model';

@Component({
  selector: 'app-file-update',
  templateUrl: './file-update.component.html',
  styleUrls: ['./file-update.component.scss']
})
export class FileUpdateComponent {
  @Output() newItemEvent = new EventEmitter<FileUrl[]>();

  fileList: FileUrl[] = [{file: null, imageUrl: ''}, {file: null, imageUrl: ''}, {file: null, imageUrl: ''}];
  imageAddUrl = './assets/addProduct.png';
  constructor() { }

  getFileList(): FileUrl[]{
    let imageList: FileUrl[] = [];
    this.fileList.forEach((fileObj: FileUrl)=>{  if(fileObj.file) imageList.push(fileObj);  });
    return imageList;
  }    
    async onFileSelected(event){
      let imagePositionNumber = event.target.id.split('-')[1];
      this.fileList[imagePositionNumber].file = event.target.files[0];
      
      const reader = new FileReader();  
      this.fileList[imagePositionNumber].imageUrl = await this.parseFile(this.fileList[imagePositionNumber].file) as string;
      
      let files = this.getFileList();
      this.newItemEvent.emit(files);
  }

  onDeleteFile(position){
      this.fileList[position]={file: null, imageUrl: null};
      let files = this.getFileList();
      this.newItemEvent.emit(files);
  }

  parseFile(file: File) {
    return new Promise((resolve, reject) => {
      let content = '';
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const result = e.target.result;
        resolve(result);
      };
      reader.onerror = function(e: any) {
        reject(e);
      };
      reader.readAsDataURL( file);
    });
  }
}
