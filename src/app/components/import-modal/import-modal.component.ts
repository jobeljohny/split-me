import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ReceiptType } from 'src/app/classes/constants';
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
  parseType: ReceiptType = ReceiptType.REGULAR;
  constructor(
    public dialogRef: MatDialogRef<ImportModalComponent>,
    private ocr: OCRApiService
  ) {}
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
      this.parsedItems = await this.ocr.getReciept(
        this.cropImgBlob,
        this.parseType
      );

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

  addPalettes() {
    this.dialogRef.close(this.parsedItems);
  }

  get ReceiptType() {
    return ReceiptType;
  }
}
