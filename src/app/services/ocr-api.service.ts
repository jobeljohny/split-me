import { Injectable } from '@angular/core';
import { Line, PSM, createWorker } from 'tesseract.js';
import { ImageProcessor } from '../classes/imageProcesser';
import { IBillEntry } from '../classes/interfaces';
import { TESS_WHITELIST, billFilters } from '../classes/constants';
@Injectable({
  providedIn: 'root',
})
export class OCRApiService {
  constructor() {}

  async getReciept(blob: Blob) {
    const image = new ImageProcessor();
    await image.loadImage(blob);
    const worker = await createWorker('eng');
    worker.setParameters({
      tessedit_pageseg_mode: PSM.SINGLE_COLUMN,
      tessedit_char_whitelist: TESS_WHITELIST,
    });
    let entries: IBillEntry[] = [];
    try {
      let result = await worker.recognize(image.getImage(), {
        rotateAuto: true,
      });
      console.log('OCR Result:', result);
      entries = this.processResult(result.data.lines);
    } catch (error) {
      console.error('OCR Error:', error);
    } finally {
      await worker.terminate();
    }
    return entries;
  }
  removeIndex(inputString: string): string {
    const indexRegex = /^\d+\s+/;
    return inputString.replace(indexRegex, '');
  }
  isolatedPriceAppender(lines: string[]): string[] {
    const Priceregex: RegExp = /\b\d+\.\d{2}\b/;
    const alphabetRegex: RegExp = /[a-z]/i;

    for (let i = 0; i < lines.length; i++) {
      if (Priceregex.test(lines[i]) && i > 0) {
        if (!alphabetRegex.test(lines[i])) {
          lines[i - 1] += ' ' + lines[i];
          lines[i] = '';
        }
      }
    }
    return lines;
  }
  filterValidEntries(lines: string[]): IBillEntry[] {
    let validEntries: IBillEntry[] = [];
    const Priceregex: RegExp = /\b\d+\.\d{2}\b/;
    const itemRegex: RegExp = /([^\d]+(?:\s+[^\d]+)*)/;
    lines.forEach((line) => {
      if (billFilters.some(keyword => line.includes(keyword))) return;
      if (Priceregex.test(line) && itemRegex.test(line)) {
        const item = line.match(itemRegex);
        const price = line.match(Priceregex);
        if (item && price) {
          let validEntry: IBillEntry = {
            item: item[0].trim(),
            amount: parseFloat(price[0]),
          };
          validEntries.push(validEntry);
        }
      }
    });
    return validEntries;
  }

  updateStructure(lines: string[]) {
    lines = lines.map((line) => this.removeIndex(line));
    lines = this.isolatedPriceAppender(lines);
    lines = lines.filter((line) => line);
    return this.filterValidEntries(lines);
  }

  processResult(lines: Line[]) {
    const strings = lines.map((line) =>
      line.text.replace(/\n/g, '').trim().toLowerCase()
    );
    return this.updateStructure(strings);
  }
}
