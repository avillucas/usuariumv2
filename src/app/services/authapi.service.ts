import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { AuthConstants } from '../config/auth-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthapiService {
  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router
  ) {}

  login(postData: any): Observable<any> {  
    return this.httpService.post('auth/login', postData);
  }

  register(postData: any): Observable<any> {
    return this.httpService.post('auth/register', postData);
  }

  logout() {
    this.storageService.remove(AuthConstants.AUTH);
    this.router.navigate(['/login']);    
  }
}