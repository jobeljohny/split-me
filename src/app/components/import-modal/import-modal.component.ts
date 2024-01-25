import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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
  cropImgBlob: Blob | undefined ;
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


  removeParsedItem(index: number) {
    this.parsedItems.splice(index, 1);
  }


  addPalettes() {
    this.dialogRef.close(this.parsedItems);
  }

  get ReceiptType() {
    return ReceiptType;
  }
}
