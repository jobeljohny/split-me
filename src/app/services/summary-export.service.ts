import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
@Injectable({
  providedIn: 'root',
})
export class SummaryExportService {
  constructor() {}

  download(
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
    type: string
  ) {
    const orientation = width >= height ? 'l' : 'p';

    const FILEURI = canvas.toDataURL('image/png');
    var link = document.createElement('a');
    link.download = 'food-summary.png';
    link.href = FILEURI;
    if (type == 'img') {
      link.click();
    } else {
      let PDF = new jsPDF(orientation, 'px', 'a4');
      const imgProps = PDF.getImageProperties(canvas);
      let fileHeight = PDF.internal.pageSize.getHeight();
      let fileWidth = (imgProps.width * fileHeight) / imgProps.height;

      const pageWidth = PDF.internal.pageSize.getWidth();
      const pageHeight = PDF.internal.pageSize.getHeight();

      const widthRatio = pageWidth / canvas.width;
      const heightRatio = pageHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

      const canvasWidth = canvas.width * ratio;
      const canvasHeight = canvas.height * ratio;

      const marginX = (pageWidth - canvasWidth) / 2;
      const marginY = (pageHeight - canvasHeight) / 2;

      PDF.addImage(FILEURI, 'PNG', marginX, marginY, fileWidth, fileHeight);
      PDF.save('food-summary.pdf');
    }

    console.log('downlaod complete');
  }
}
