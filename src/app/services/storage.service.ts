import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  constructor(
    private  _storage:  Storage
  ) { 
    this.init();    
  }

  async init() {    
    const storage = await this._storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users 
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  //returns an storage value
  public get(key: string) {
    return this._storage?.get(key);
  }

  //removes an storaged value
  public remove(key:string){
    this._storage.remove(key);
  }
  
  public keys(){
    return this._storage.keys()
  }
}
