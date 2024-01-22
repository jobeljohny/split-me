import { Component } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { IBillEntry } from 'src/app/classes/interfaces';
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
  uploadStart: boolean = false;
  imgChangeEvt: string = '';
  cropImgPreview: string | undefined = '';
  cropImgBlob: Blob | undefined | null;
  parsedItems: IBillEntry[] = [];
  constructor(private ocr: OCRApiService) {
    //TODO remove
    //setTimeout(() => this.upload(), 200);
    this.fileName = 'thenkasibill.jpg';
    this.fileSize = '35.89 KB';
    this.fileFlag = false;
    this.parsedItems = [
      {
        item: 'party time',
        amount: 1499,
      },
      {
        item: 'orange alfahm',
        amount: 180,
      },
      {
        item: 'coleslaw',
        amount: 50,
      },
      {
        item: 'pepsi',
        amount: 70,
      },
      {
        item: 'cgst',
        amount: 52.73,
      },
      {
        item: 'sgst',
        amount: 52.73,
      },
      {
        item: 'round off',
        amount: 0.46,
      },
    ];
   // this.parsedItems=[];
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
      this.parsedItems = await this.ocr.getReciept(this.cropImgBlob);
      console.log('result');
      console.log(this.parsedItems);

      this.uploadStart = false;
    }
  }

  imgFailed() {
    // error msg
    console.log('error occured');
  }

  removeParsedItem(index: number) {
    this.parsedItems.splice(index, 1);
  }

  cropImg(e: ImageCroppedEvent) {
    if (e.objectUrl) {
      this.cropImgPreview = e.objectUrl;
      this.cropImgBlob = e.blob;
    }
  }
}
