import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { ReceiptType } from 'src/app/classes/constants';

@Component({
  selector: 'app-bill-image-preview',
  templateUrl: './bill-image-preview.component.html',
  styleUrls: ['./bill-image-preview.component.scss'],
})
export class BillImagePreviewComponent {
  @Input('image') file!: File;
  @Output('cropped') cropped = new EventEmitter<Blob>();
  @Output('billType') parseTypeChange = new EventEmitter<ReceiptType>();
  parseType: ReceiptType = ReceiptType.REGULAR;
  cropImgPreview: string | undefined = '';
  cropImgBlob: Blob | undefined | null;
  constructor(private toastr: ToastrService) {}

  cropImg(e: ImageCroppedEvent) {
    if (e.objectUrl && e.blob) {
      this.cropImgPreview = e.objectUrl;
      this.cropped.emit(e.blob);
    }
  }
  imgFailed() {
    // error msg
    this.toastr.error('invalid image file');
  }
  onParseTypeChange(newValue: ReceiptType) {
    this.parseType = newValue;
    this.parseTypeChange.emit(newValue);
  }

  get ReceiptType() {
    return ReceiptType;
  }
}
