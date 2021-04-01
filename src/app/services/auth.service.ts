import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { User } from '../entities/user';
import {AuthResponse} from '../responses/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(    
    private  storage:  StorageService,    
  ) {     
  }

  register(user: User): Observable<User> {    
    return new Observable((observer)=>{
           this.storage.set(user.email, user);
           observer.next(user);
    });
  }

  login(user: User): Observable<AuthResponse> {    
    return new Observable((observer)=>{      
           this.storage.get(user.email).then((storeUser) => {                          
            let response:AuthResponse = {user:user,loguedIn:false};            
            if (storeUser != null) {
              const stUser = storeUser as User;              
              if(user.password == stUser.password ){
                console.log('usuario valido', stUser);                
                response.user = stUser;
                response.loguedIn = true;
              }                           
            }
            observer.next(response);                                                
    });
   });
 }

  async logout(user) {
    await this.storage.remove(user.email);    
  }

  

}

