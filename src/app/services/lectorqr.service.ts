import { Injectable } from '@angular/core';

import { Plugins } from '@capacitor/core';
@Injectable({
  providedIn: 'root'
})
export class LectorqrService {

  readonly CODIGO_10 = '8c95def646b6127282ed50454b73240300dccabc';
  readonly CODIGO_50 = 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172';
  readonly CODIGO_100 = '2786f4877b9091dcad7f35751bfcf5d5ea712b2f';
  
  constructor() { 


  }

  escanear():number{

    let acreditado = 0;
    const startScan = async () => {
      const { BarcodeScanner } = Plugins;
    
      BarcodeScanner.hideBackground(); // make background of WebView transparent
    
      const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
    
      // if the result has content
      if (result.hasContent) {
        console.log(result.content); // log the raw scanned content
        alert(result.contest);
         acreditado = this.determinarMontoAcreditado(result.contest);
        alert(acreditado);
       
      }else{
        alert('no pudo ser leido');
      }
    }; 
    return acreditado;
  }

  determinarMontoAcreditado(lectura:string):number{
    let creditos = 0;    
    if(lectura == this.CODIGO_10){
      creditos = 10;
    }else if(lectura == this.CODIGO_50){
      creditos = 50;
    }else if(lectura == this.CODIGO_100){
      creditos = 100;
    }
    return creditos;
  }

  
  
}
