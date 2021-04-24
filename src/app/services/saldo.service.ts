import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaldoService {

  private _saldo:number;
  constructor() { 
    this._saldo = 0 ;
  }

  get saldo():number{
    return this._saldo;
  }

  cargarSaldo(saldo:number){
    this._saldo += saldo;
  }

}
