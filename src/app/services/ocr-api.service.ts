import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class OCRApiService {
  url2: string = "https://api.ocr.space/parse/image";
  private recieptUrlSource = new Subject<string>();
  recieptUrl$ = this.recieptUrlSource.asObservable();

  constructor(private http: HttpClient) {}

  Receipt(link: string) {
    this.recieptUrlSource.next(link);
  }


  async getReciept(file:File) {
    try {
      const formData = new FormData();
      formData.append('file',file)
      formData.append('fileType',"JPG")
      formData.append('isTable',"true")
      formData.append('detectOrientation','true')
      const options = {
        headers:{"apiKey":"K83225224488957"}
      }
      console.log("fetching started");
      
      const data = await firstValueFrom(
        this.http.post<any>(this.url2,formData,options)
      ).catch((error)=>{
        console.log(error);
        
      });
      console.log("fetching completed");
      
      console.log(data);
      
      
      this.Receipt(data);
    } catch (error) {
      console.warn('There was an error!', error);
    }
  }
}
