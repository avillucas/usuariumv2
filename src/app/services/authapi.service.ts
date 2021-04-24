import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { HttpService } from './http.service';
import { AuthConstants } from '../config/auth-constants';
import {map, tap, switchMap } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
const {Storage} = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthapiService {

  isAuthenticated : BehaviorSubject<boolean>= new BehaviorSubject<boolean>(null);
  token = '';  

  constructor(
    private httpService: HttpService    
  ) {
    this.loadToken();
  }

  async loadToken(){
    const token = await Storage.get({ key: AuthConstants.AUTH });    
    if (token && token.value) {
      //console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }


  login(postData : { username:string , password:string } ): Observable<any> {     
    const isAdmin = (AuthConstants.validarAdministrador( postData.username))? '1':'0';
    Storage.set({key: AuthConstants.IS_ADMIN, value: isAdmin});      
    return  this.httpService.post(AuthConstants.LOGIN_PATH, postData).pipe(
      map( (data:any) =>  data.token),
      switchMap(
        token=>{ 
          return from(Storage.set({key: AuthConstants.AUTH, value: token}));                     
      }),
      tap( () => {
          this.isAuthenticated.next(true);
      })
    );    
  }

  register(postData: {username:string, password:string}): Observable<any> { 
      return  this.httpService.post(AuthConstants.REGISTER_PATH, {username:postData.username,password:postData.password});    
  }

  logout() {
    this.isAuthenticated.next(false);
    return Storage.remove({key: AuthConstants.AUTH});    
  }
  
  isAdmin(){
   return false;
  }
}