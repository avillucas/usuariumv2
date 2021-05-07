import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CreditApiService {

  readonly PATH = 'charge';

  constructor(
    private httpService: HttpService 
    
  ) { }

  charge(code:string , credit:number): Observable<any> {      
    return  this.httpService.post(this.PATH, {
      "code":code,
      "credit":credit
    });
  }

}
