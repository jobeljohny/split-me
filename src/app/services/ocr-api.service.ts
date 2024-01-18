import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, firstValueFrom } from 'rxjs';
import { IBillEntry } from '../classes/interfaces';
import { OCR_API_KEY } from '../classes/environment';
@Injectable({
  providedIn: 'root',
})
export class OCRApiService {
  url2: string = 'https://api.ocr.space/parse/image';
  private recieptUrlSource = new Subject<string>();
  recieptUrl$ = this.recieptUrlSource.asObservable();

  constructor(private http: HttpClient) {}

  Receipt(link: string) {
    this.recieptUrlSource.next(link);
  }

  async getReciept(file: File) {
    const mock = {
      ParsedResults: [
        {
          TextOverlay: {
            Lines: [
              {
                LineText: '26, Gariahat (South) Dakuria,',
                Words: [
                  {
                    WordText: '26,',
                    Left: 103,
                    Top: 17,
                    Height: 13,
                    Width: 20,
                  },
                  {
                    WordText: 'Gariahat',
                    Left: 129,
                    Top: 17,
                    Height: 11,
                    Width: 60,
                  },
                  {
                    WordText: '(South)',
                    Left: 195,
                    Top: 17,
                    Height: 13,
                    Width: 52,
                  },
                  {
                    WordText: 'Dakuria,',
                    Left: 254,
                    Top: 17,
                    Height: 12,
                    Width: 58,
                  },
                ],
                MaxHeight: 13,
                MinTop: 17,
              },
              {
                LineText: 'Kolkata- 700031',
                Words: [
                  {
                    WordText: 'Kolkata-',
                    Left: 151,
                    Top: 32,
                    Height: 11,
                    Width: 57,
                  },
                  {
                    WordText: '700031',
                    Left: 214,
                    Top: 32,
                    Height: 10,
                    Width: 51,
                  },
                ],
                MaxHeight: 11,
                MinTop: 32,
              },
              {
                LineText: 'contact: 033-29712027,',
                Words: [
                  {
                    WordText: 'contact:',
                    Left: 123,
                    Top: 48,
                    Height: 10,
                    Width: 57,
                  },
                  {
                    WordText: '033-29712027,',
                    Left: 186,
                    Top: 47,
                    Height: 13,
                    Width: 106,
                  },
                ],
                MaxHeight: 13,
                MinTop: 47,
              },
              {
                LineText: '9836512340',
                Words: [
                  {
                    WordText: '9836512340',
                    Left: 165,
                    Top: 62,
                    Height: 11,
                    Width: 86,
                  },
                ],
                MaxHeight: 11,
                MinTop: 62,
              },
              {
                LineText: 'E-mail:',
                Words: [
                  {
                    WordText: 'E-mail:',
                    Left: 184,
                    Top: 77,
                    Height: 11,
                    Width: 47,
                  },
                ],
                MaxHeight: 11,
                MinTop: 77,
              },
              {
                LineText: 'maarhabarestaurant@gmail.com',
                Words: [
                  {
                    WordText: 'maarhabarestaurant@gmail.com',
                    Left: 93,
                    Top: 92,
                    Height: 13,
                    Width: 229,
                  },
                ],
                MaxHeight: 13,
                MinTop: 92,
              },
              {
                LineText: 'Name:',
                Words: [
                  {
                    WordText: 'Name:',
                    Left: 84,
                    Top: 122,
                    Height: 9,
                    Width: 40,
                  },
                ],
                MaxHeight: 9,
                MinTop: 122,
              },
              {
                LineText: 'Date: 18/10/18',
                Words: [
                  {
                    WordText: 'Date:',
                    Left: 85,
                    Top: 156,
                    Height: 10,
                    Width: 33,
                  },
                  {
                    WordText: '18/10/18',
                    Left: 125,
                    Top: 156,
                    Height: 12,
                    Width: 56,
                  },
                ],
                MaxHeight: 12,
                MinTop: 156,
              },
              {
                LineText: '2245',
                Words: [
                  {
                    WordText: '2245',
                    Left: 85,
                    Top: 171,
                    Height: 10,
                    Width: 35,
                  },
                ],
                MaxHeight: 10,
                MinTop: 171,
              },
              {
                LineText: 'Bill 5365',
                Words: [
                  {
                    WordText: 'Bill',
                    Left: 85,
                    Top: 185,
                    Height: 11,
                    Width: 18,
                  },
                  {
                    WordText: '5365',
                    Left: 141,
                    Top: 185,
                    Height: 11,
                    Width: 29,
                  },
                ],
                MaxHeight: 11,
                MinTop: 185,
              },
              {
                LineText: 'No.ltem',
                Words: [
                  {
                    WordText: 'No.ltem',
                    Left: 85,
                    Top: 214,
                    Height: 10,
                    Width: 50,
                  },
                ],
                MaxHeight: 10,
                MinTop: 214,
              },
              {
                LineText: '•Watéi- Bottle',
                Words: [
                  {
                    WordText: '•Watéi-',
                    Left: 99,
                    Top: 240,
                    Height: 11,
                    Width: 45,
                  },
                  {
                    WordText: 'Bottle',
                    Left: 148,
                    Top: 241,
                    Height: 10,
                    Width: 36,
                  },
                ],
                MaxHeight: 11,
                MinTop: 240,
              },
              {
                LineText: '(packeged)',
                Words: [
                  {
                    WordText: '(packeged)',
                    Left: 106,
                    Top: 256,
                    Height: 13,
                    Width: 69,
                  },
                ],
                MaxHeight: 13,
                MinTop: 256,
              },
              {
                LineText: 'crispy Chilli',
                Words: [
                  {
                    WordText: 'crispy',
                    Left: 105,
                    Top: 271,
                    Height: 13,
                    Width: 39,
                  },
                  {
                    WordText: 'Chilli',
                    Left: 149,
                    Top: 270,
                    Height: 11,
                    Width: 31,
                  },
                ],
                MaxHeight: 13,
                MinTop: 270,
              },
              {
                LineText: 'Baby Corn',
                Words: [
                  {
                    WordText: 'Baby',
                    Left: 105,
                    Top: 286,
                    Height: 12,
                    Width: 30,
                  },
                  {
                    WordText: 'Corn',
                    Left: 140,
                    Top: 286,
                    Height: 10,
                    Width: 29,
                  },
                ],
                MaxHeight: 12,
                MinTop: 286,
              },
              {
                LineText: 'Kashmiri',
                Words: [
                  {
                    WordText: 'Kashmiri',
                    Left: 105,
                    Top: 301,
                    Height: 11,
                    Width: 54,
                  },
                ],
                MaxHeight: 11,
                MinTop: 301,
              },
              {
                LineText: 'pulao',
                Words: [
                  {
                    WordText: 'pulao',
                    Left: 104,
                    Top: 317,
                    Height: 10,
                    Width: 33,
                  },
                ],
                MaxHeight: 10,
                MinTop: 317,
              },
              {
                LineText: 'Kadai',
                Words: [
                  {
                    WordText: 'Kadai',
                    Left: 104,
                    Top: 331,
                    Height: 11,
                    Width: 34,
                  },
                ],
                MaxHeight: 11,
                MinTop: 331,
              },
              {
                LineText: '4',
                Words: [
                  {
                    WordText: '4',
                    Left: 88,
                    Top: 340,
                    Height: 10,
                    Width: 8,
                  },
                ],
                MaxHeight: 10,
                MinTop: 340,
              },
              {
                LineText: 'Chicken',
                Words: [
                  {
                    WordText: 'Chicken',
                    Left: 104,
                    Top: 347,
                    Height: 11,
                    Width: 49,
                  },
                ],
                MaxHeight: 11,
                MinTop: 347,
              },
              {
                LineText: 'Mutton',
                Words: [
                  {
                    WordText: 'Mutton',
                    Left: 104,
                    Top: 363,
                    Height: 10,
                    Width: 42,
                  },
                ],
                MaxHeight: 10,
                MinTop: 363,
              },
              {
                LineText: 'Biriyani',
                Words: [
                  {
                    WordText: 'Biriyani',
                    Left: 103,
                    Top: 378,
                    Height: 13,
                    Width: 48,
                  },
                ],
                MaxHeight: 13,
                MinTop: 378,
              },
              {
                LineText: '6 Soft Drinks',
                Words: [
                  {
                    WordText: '6',
                    Left: 88,
                    Top: 393,
                    Height: 11,
                    Width: 7,
                  },
                  {
                    WordText: 'Soft',
                    Left: 103,
                    Top: 393,
                    Height: 11,
                    Width: 25,
                  },
                  {
                    WordText: 'Drinks',
                    Left: 134,
                    Top: 393,
                    Height: 11,
                    Width: 40,
                  },
                ],
                MaxHeight: 11,
                MinTop: 393,
              },
              {
                LineText: 'Dine In: 6',
                Words: [
                  {
                    WordText: 'Dine',
                    Left: 209,
                    Top: 156,
                    Height: 10,
                    Width: 27,
                  },
                  {
                    WordText: 'In:',
                    Left: 241,
                    Top: 156,
                    Height: 10,
                    Width: 16,
                  },
                  {
                    WordText: '6',
                    Left: 264,
                    Top: 156,
                    Height: 10,
                    Width: 7,
                  },
                ],
                MaxHeight: 10,
                MinTop: 156,
              },
              {
                LineText: 'Cashier: Raju',
                Words: [
                  {
                    WordText: 'Cashier:',
                    Left: 209,
                    Top: 171,
                    Height: 10,
                    Width: 50,
                  },
                  {
                    WordText: 'Raju',
                    Left: 265,
                    Top: 171,
                    Height: 12,
                    Width: 27,
                  },
                ],
                MaxHeight: 12,
                MinTop: 171,
              },
              {
                LineText: 'persons; 2',
                Words: [
                  {
                    WordText: 'persons;',
                    Left: 209,
                    Top: 186,
                    Height: 10,
                    Width: 51,
                  },
                  {
                    WordText: '2',
                    Left: 267,
                    Top: 185,
                    Height: 11,
                    Width: 6,
                  },
                ],
                MaxHeight: 11,
                MinTop: 185,
              },
              {
                LineText: 'Qty.',
                Words: [
                  {
                    WordText: 'Qty.',
                    Left: 188,
                    Top: 213,
                    Height: 13,
                    Width: 25,
                  },
                ],
                MaxHeight: 13,
                MinTop: 213,
              },
              {
                LineText: 'Total Qty: 6',
                Words: [
                  {
                    WordText: 'Total',
                    Left: 136,
                    Top: 430,
                    Height: 11,
                    Width: 31,
                  },
                  {
                    WordText: 'Qty:',
                    Left: 173,
                    Top: 431,
                    Height: 13,
                    Width: 26,
                  },
                  {
                    WordText: '6',
                    Left: 206,
                    Top: 431,
                    Height: 10,
                    Width: 7,
                  },
                ],
                MaxHeight: 13,
                MinTop: 430,
              },
              {
                LineText: 'Price',
                Words: [
                  {
                    WordText: 'Price',
                    Left: 234,
                    Top: 214,
                    Height: 9,
                    Width: 29,
                  },
                ],
                MaxHeight: 9,
                MinTop: 214,
              },
              {
                LineText: '30.00',
                Words: [
                  {
                    WordText: '30.00',
                    Left: 229,
                    Top: 248,
                    Height: 11,
                    Width: 35,
                  },
                ],
                MaxHeight: 11,
                MinTop: 248,
              },
              {
                LineText: '170.00',
                Words: [
                  {
                    WordText: '170.00',
                    Left: 222,
                    Top: 278,
                    Height: 10,
                    Width: 42,
                  },
                ],
                MaxHeight: 10,
                MinTop: 278,
              },
              {
                LineText: '130.00',
                Words: [
                  {
                    WordText: '130.00',
                    Left: 222,
                    Top: 308,
                    Height: 11,
                    Width: 43,
                  },
                ],
                MaxHeight: 11,
                MinTop: 308,
              },
              {
                LineText: '250.00',
                Words: [
                  {
                    WordText: '250.00',
                    Left: 221,
                    Top: 339,
                    Height: 11,
                    Width: 44,
                  },
                ],
                MaxHeight: 11,
                MinTop: 339,
              },
              {
                LineText: '220. oo',
                Words: [
                  {
                    WordText: '220.',
                    Left: 222,
                    Top: 371,
                    Height: 10,
                    Width: 26,
                  },
                  {
                    WordText: 'oo',
                    Left: 251,
                    Top: 371,
                    Height: 10,
                    Width: 14,
                  },
                ],
                MaxHeight: 10,
                MinTop: 371,
              },
              {
                LineText: '40.00',
                Words: [
                  {
                    WordText: '40.00',
                    Left: 229,
                    Top: 394,
                    Height: 10,
                    Width: 37,
                  },
                ],
                MaxHeight: 10,
                MinTop: 394,
              },
              {
                LineText: 'sub',
                Words: [
                  {
                    WordText: 'sub',
                    Left: 242,
                    Top: 423,
                    Height: 11,
                    Width: 24,
                  },
                ],
                MaxHeight: 11,
                MinTop: 423,
              },
              {
                LineText: 'Total',
                Words: [
                  {
                    WordText: 'Total',
                    Left: 234,
                    Top: 438,
                    Height: 11,
                    Width: 32,
                  },
                ],
                MaxHeight: 11,
                MinTop: 438,
              },
              {
                LineText: 'Amount',
                Words: [
                  {
                    WordText: 'Amount',
                    Left: 284,
                    Top: 214,
                    Height: 9,
                    Width: 48,
                  },
                ],
                MaxHeight: 9,
                MinTop: 214,
              },
              {
                LineText: '30.00',
                Words: [
                  {
                    WordText: '30.00',
                    Left: 298,
                    Top: 248,
                    Height: 10,
                    Width: 35,
                  },
                ],
                MaxHeight: 10,
                MinTop: 248,
              },
              {
                LineText: '170.00',
                Words: [
                  {
                    WordText: '170.00',
                    Left: 291,
                    Top: 278,
                    Height: 10,
                    Width: 43,
                  },
                ],
                MaxHeight: 10,
                MinTop: 278,
              },
              {
                LineText: '00.00',
                Words: [
                  {
                    WordText: '00.00',
                    Left: 292,
                    Top: 304,
                    Height: 15,
                    Width: 43,
                  },
                ],
                MaxHeight: 15,
                MinTop: 304,
              },
              {
                LineText: '250.00',
                Words: [
                  {
                    WordText: '250.00',
                    Left: 292,
                    Top: 339,
                    Height: 11,
                    Width: 44,
                  },
                ],
                MaxHeight: 11,
                MinTop: 339,
              },
              {
                LineText: '220.00',
                Words: [
                  {
                    WordText: '220.00',
                    Left: 292,
                    Top: 371,
                    Height: 11,
                    Width: 45,
                  },
                ],
                MaxHeight: 11,
                MinTop: 371,
              },
              {
                LineText: '40.00',
                Words: [
                  {
                    WordText: '40.00',
                    Left: 300,
                    Top: 394,
                    Height: 11,
                    Width: 37,
                  },
                ],
                MaxHeight: 11,
                MinTop: 394,
              },
              {
                LineText: '840.00',
                Words: [
                  {
                    WordText: '840.00',
                    Left: 293,
                    Top: 431,
                    Height: 11,
                    Width: 44,
                  },
                ],
                MaxHeight: 11,
                MinTop: 431,
              },
            ],
            HasOverlay: true,
            Message: 'Total lines: 45',
          },
          TextOrientation: '0',
          FileParseExitCode: 1,
          ParsedText:
            '26, Gariahat (South) Dakuria,\t\r\nKolkata- 700031\t\r\ncontact: 033-29712027,\t\r\n9836512340\t\r\nE-mail:\t\r\nmaarhabarestaurant@gmail.com\t\r\nName:\t\r\nDate: 18/10/18\tDine In: 6\t\r\n2245\tCashier: Raju\t\r\nBill 5365\tpersons; 2\t\r\nNo.ltem\tQty.\tPrice\tAmount\t\r\n•Watéi- Bottle\t\r\n30.00\t30.00\t\r\n(packeged)\t\r\ncrispy Chilli\t170.00\t170.00\t\r\nBaby Corn\t\r\nKashmiri\t00.00\t\r\n130.00\t\r\npulao\t\r\nKadai\t\r\n4\t250.00\t250.00\t\r\nChicken\t\r\nMutton\t\r\n220. oo\t220.00\t\r\nBiriyani\t\r\n6 Soft Drinks\t40.00\t40.00\t\r\nsub\t\r\nTotal Qty: 6\t840.00\t\r\nTotal\t\r\n',
          ErrorMessage: '',
          ErrorDetails: '',
        },
      ],
      OCRExitCode: 1,
      IsErroredOnProcessing: false,
      ProcessingTimeInMilliseconds: '2281',
      SearchablePDFURL: 'Searchable PDF not generated as it was not requested.',
    };
    // this.processResult(mock);
    // return;
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileType', 'JPG');
      formData.append('isTable', 'true');
      formData.append('detectOrientation', 'true');
      const options = {
        headers: { apiKey: OCR_API_KEY },
      };
      console.log('fetching started');

      const data = await firstValueFrom(
        this.http.post<any>(this.url2, formData, options)
      ).catch((error) => {
        console.log(error);
      });
      console.log('fetching completed');

      console.log(data);

      this.processResult(data);
      this.Receipt(data);
    } catch (error) {
      console.warn('There was an error!', error);
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

  updateStructure(data: string) {
    let lines = data.split('\n').map((line) => line.replace(/\r/g, ''));
    lines = lines.map((line) => line.replace(/\t/g, ' ').trim().toLowerCase());

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

  processResult(extraction: any) {
    const data: string = extraction.ParsedResults[0].ParsedText;
    console.log(extraction);
    
    console.log('processing');
    this.updateStructure(data);
    //    const regex = /^\d+\s+[a-zA-Z]+\s+\d+\.\d+\s+\d+\.\d+$/;
  }
}
