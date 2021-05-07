import { Injectable } from '@angular/core';
import { CreditApiService } from './creditapi.service';
import { ScanResult } from '../entities/scanResult';

@Injectable({
  providedIn: 'root'
})
export class SaldoService {

  private _saldo:number;
  constructor(
    private creditService :CreditApiService
  ) { 
    this._saldo = 0 ;
  }

  get saldo():number{
    return this._saldo;
  }

  set saldo(saldo:number){
    this._saldo = saldo;
  }

  cargarSaldo(resultado:ScanResult){
    this.creditService.charge(resultado.code,resultado.credit).subscribe(
      res=>{
        this._saldo = res.userCredits;
      },
      error=>{console.error(error);}
    );
    
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
