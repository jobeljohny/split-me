import { Component, ViewChild } from '@angular/core';
import { createWorker } from 'tesseract.js';

@Component({
  selector: 'app-import-modal',
  templateUrl: './import-modal.component.html',
  styleUrls: ['./import-modal.component.scss'],
})
export class ImportModalComponent {
  fileName: string = '';
  fileSize: string = '';
  file!: File;
  titleMessage = 'Drag & drop any file here';
  fileFlag: boolean = true;
  progress = 0;
  uploadStart: boolean = false;

  onFileInput(event: any) {
    let input = event.target;
    this.fileUpdate(input.files[0]);
  }

  fileUpdate(file: File) {
    this.file = file;
    this.fileName = file.name;
    this.fileSize = (file.size / 1024).toFixed(1) + ' KB';
    this.fileFlag = false;
    this.titleMessage = 'File dopped successfully';
  }

  async upload() {
    this.uploadStart = true;
    if (!this.file) return;
    this.progress = 0;
    console.log('starting');

    const worker = await createWorker('eng');
    console.log('wroker fetched');

    try {
      let data = await worker.recognize(this.file);

      console.log('OCR Result:', data);
    } catch (error) {
      console.error('OCR Error:', error);
      this.uploadStart = false;
    } finally {
      await worker.terminate();
      this.uploadStart = false;
    }
  }
}
