import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  public host:string="http://localhost:8080"
  constructor(private http: HttpClient) { }

  public getResource(url){
      return this.http.get(this.host+url);
  }

  uploadDonnes(file:File,idProuct): Observable<HttpEvent<{}>>{
    let formData:FormData=new FormData();
    formData.append('file',file);
    const req=new HttpRequest('Post',this.host+'/uploadPhoto/'+idProuct,formData,{
      reportProgress: true ,
      responseType:'text'
    });
    return this.http.request(req);



  }
}
