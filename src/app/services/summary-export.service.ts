import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SummaryExportService {
  url1: string = 'https://litterbox.catbox.moe/resources/internals/api.php';
  url2: string = 'https://tmpfiles.org/api/v1/upload';
  private qrLinkSource = new Subject<string>();
  qrLink$ = this.qrLinkSource.asObservable();

  constructor(private http: HttpClient) {}

  QRlink(link: string) {
    this.qrLinkSource.next(link);
  }

  download(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    type: string
  ) {
    if (type == 'qr') {
      this.generateQR(canvas);
    } else if (type == 'img') {
      const FILEURI = canvas.toDataURL('image/png');
      var link = document.createElement('a');
      link.download = 'food-summary.png';
      link.href = FILEURI;
      link.click();
    } else if (type == 'pdf') {
      const orientation = width >= height ? 'l' : 'p';
      const pdf = new jsPDF({
        orientation,
        unit: 'mm',
      });
      pdf.internal.pageSize.width = width * 0.5;
      pdf.internal.pageSize.height = height * 0.5;
      pdf.addImage(canvas, 'PNG', 0, 0, width * 0.5, height * 0.5);
      pdf.save('food-summary.pdf');
    }
  }

  generateQR(canvas: HTMLCanvasElement) {
    canvas.toBlob((blob: any) => {
      let formData = new FormData();
      formData.append('file', new File([blob], 'summary.jpg'));
      this.http.post<any>(this.url2, formData).subscribe({
        next: (data) => {
          console.log('link generated');

          let downloadURL =
            data.data.url.slice(0, 21) + 'dl/' + data.data.url.slice(21);
          this.QRlink(downloadURL);
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
    });
  }
}
