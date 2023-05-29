import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';
import { Subject, firstValueFrom } from 'rxjs';
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
    switch (type) {
      case 'qr':
        this.generateQR(canvas);
        break;
      case 'img':
        const FILEURI = canvas.toDataURL('image/png');
        var link = document.createElement('a');
        link.download = 'food-summary.png';
        link.href = FILEURI;
        link.click();
        break;
      case 'pdf':
        const orientation = width >= height ? 'l' : 'p';
        const pdf = new jsPDF({ orientation, unit: 'mm' });
        pdf.internal.pageSize.width = width * 0.5;
        pdf.internal.pageSize.height = height * 0.5;
        pdf.addImage(canvas, 'PNG', 0, 0, width * 0.5, height * 0.5);
        pdf.save('food-summary.pdf');
        break;
      default:
        console.warn('Invalid type');
        break;
    }
  }

  async generateQR(canvas: HTMLCanvasElement) {
    try {
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!));
      });
      const formData = new FormData();
      formData.append('file', new File([blob], 'summary.jpg'));
      const data = await firstValueFrom(
        this.http.post<any>(this.url2, formData)
      );
      const downloadURL = `${data.data.url.slice(
        0,
        21
      )}dl/${data.data.url.slice(21)}`;
      this.QRlink(downloadURL);
    } catch (error) {
      console.warn('There was an error!', error);
    }
  }
}
