import { Component } from '@angular/core';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { Subscription } from 'rxjs';
import { OCRApiService } from 'src/app/services/ocr-api.service';

@Component({
  selector: 'app-import-modal',
  templateUrl: './import-modal.component.html',
  styleUrls: ['./import-modal.component.scss'],
})
export class ImportModalComponent {
  fileName: string = '';
  fileSize: string = '';
  file!: File;
  fileFlag: boolean = true;
  progress = 0;
  uploadStart: boolean = false;
  imgChangeEvt: string = '';
  cropImgPreview: string | undefined = '';
  cropImgBlob: Blob | undefined | null;
  constructor(private ocr: OCRApiService) {
    //TODO remove
    // setTimeout(() => this.upload(), 200);
  }
  onFileInput(event: any) {
    let input = event.target;
    this.fileUpdate(input.files[0]);
  }

  fileUpdate(file: File) {
    this.file = file;
    this.fileName = file.name;
    this.fileSize = (file.size / 1024).toFixed(1) + ' KB';
    this.fileFlag = false;
  }

  async upload() {
    if (this.cropImgBlob) {
      this.uploadStart = true;
      await this.ocr.getReciept(this.cropImgBlob);
      this.uploadStart = false;
    }
  }

  imgFailed() {
    // error msg
    console.log('error occured');
  }

  cropImg(e: ImageCroppedEvent) {
    if (e.objectUrl) {
      this.cropImgPreview = e.objectUrl;
      this.cropImgBlob = e.blob;
    }
  }
}
