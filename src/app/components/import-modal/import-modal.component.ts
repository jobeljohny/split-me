import { Component, ViewChild } from '@angular/core';

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

  upload() {
    if (!this.file) return;
  }
}
