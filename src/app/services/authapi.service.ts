import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { AuthConstants } from '../config/auth-constants';
import { AuthResponse } from '../responses/auth-response';

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
    const a = this.httpService.post('auth/login', postData);
    a.subscribe(            
      (authResponse)=>{
        const a  = authResponse  as AuthResponse;
        //salvar el token
        this.storageService.set('token',a.token);                
      }
    );
    return a;
  }

  register(postData: any): Observable<any> {
    
    return this.httpService.post('auth/register', {'username':postData.username, 'password':postData.password});
  }

  logout() {
    this.storageService.remove(AuthConstants.AUTH);
    this.router.navigate(['/login']);    
  }
}