import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  post(serviceName: string, data: any) {    
    const url = environment.apiUrl + serviceName;
    return  this.http.post(url, JSON.stringify(data));
  }

  get(serviceName: string) :Observable<any>{    
    const url = environment.apiUrl + serviceName;
    return  this.http.get(url);
  }
}