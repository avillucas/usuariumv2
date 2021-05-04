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


  validarCarga(creditoDeseado:number){
    const actual = this.saldo;    
    if(creditoDeseado == 10 && actual != 10 && actual != 60 && actual != 110 && actual != 160)
    {
      return true;
    }
    if(creditoDeseado == 50 && actual != 50 && actual != 60 && actual != 150 && actual != 160)
    {
      return true;
    }
    if(creditoDeseado == 100 && actual != 100  && actual != 150 && actual != 110 && actual != 160)
    {
      return true;
    }    
    return false;
  }
}
