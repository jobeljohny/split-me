import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Line, PSM, createWorker } from 'tesseract.js';
import { ImageProcessor } from '../classes/imageProcesser';
import { IBillEntry } from '../classes/interfaces';
@Injectable({
  providedIn: 'root',
})
export class OCRApiService {
  private recieptUrlSource = new Subject<string>();
  recieptUrl$ = this.recieptUrlSource.asObservable();

  constructor() {}

  notifyCompletion(link: string) {
    this.recieptUrlSource.next(link);
  }

  async getReciept(blob: Blob) {
    const image = new ImageProcessor();
    await image.loadImage(blob);
    const worker = await createWorker('eng');
    worker.setParameters({ tessedit_pageseg_mode: PSM.SINGLE_COLUMN });
    try {
      let result = await worker.recognize(image.getImage(), {
        rotateAuto: true,
      });
      //console.log('OCR Result:', result);
      this.processResult(result.data.lines);
    } catch (error) {
      console.error('OCR Error:', error);
    } finally {
      await worker.terminate();
    }
  }
  removeIndex(inputString: string): string {
    const indexRegex = /^\d+\s+/;
    return inputString.replace(indexRegex, '');
  }
  isolatedPriceAppender(lines: string[]): string[] {
    const Priceregex: RegExp = /\b\d+\.\d{2}\b/;
    let updateLines: string[] = [];

    const alphabetRegex: RegExp = /[a-z]/i;

    for (let i = 0; i < lines.length; i++) {
      if (Priceregex.test(lines[i]) && i > 0) {
        if (!alphabetRegex.test(lines[i])) {
          lines[i - 1] += ' ' + lines[i];
          lines[i] = '';
          console.log();
        }
      }
      const element = lines[i];
    }
    return lines;
  }
  filterValidEntries(lines: string[]) {
    let validEntries: IBillEntry[] = [];
    const Priceregex: RegExp = /\b\d+\.\d{2}\b/;
    const itemRegex: RegExp = /([^\d]+(?:\s+[^\d]+)*)/;
    lines.forEach((line) => {
      if (line.includes('total')) return;
      if (Priceregex.test(line) && itemRegex.test(line)) {
        const item = line.match(itemRegex);
        const price = line.match(Priceregex);
        if (item && price) {
          let validEntry: IBillEntry = {
            item: item[0],
            amount: parseFloat(price[0]),
          };
          validEntries.push(validEntry);
        }
      }
    });
    return validEntries;
  }

  updateStructure(lines: string[]) {
    console.log('initial lines');
    console.log(lines);
    lines = lines.map((line) => this.removeIndex(line));
    console.log('index removal:');
    console.log(lines);

    lines = this.isolatedPriceAppender(lines);
    console.log('price isolator');
    console.log(lines);
    lines = lines.filter((line) => line);
    console.log('removing empty');
    console.log(lines);
    console.log(this.filterValidEntries(lines));
  }

  processResult(lines: Line[]) {
    const strings = lines.map((line) =>
      line.text.replace(/\n/g, '').trim().toLowerCase()
    );
    this.updateStructure(strings);
  }
}
