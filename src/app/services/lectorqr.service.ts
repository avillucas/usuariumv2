import { Injectable } from '@angular/core';
import { SupportedFormat } from '@capacitor-community/barcode-scanner';
import { Plugins } from '@capacitor/core';
import { EMPTY } from 'rxjs';
import { ScanResult } from '../entities/scanResult';

@Injectable({
  providedIn: 'root'
})
export class LectorqrService {

  public scanActive:boolean;

  readonly CODIGO_10 = '8c95def646b6127282ed50454b73240300dccabc';
  readonly CODIGO_50 = 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172';
  readonly CODIGO_100 = '2786f4877b9091dcad7f35751bfcf5d5ea712b2f';
  
  constructor() { 
    this.scanActive= false;
  }
  
  async escanear():Promise<ScanResult>{
    const allow = this.checkPermition();
    let acreditado = 0;
    let codigo = '';
    if(allow){   
      this.scanActive = true;
      const { BarcodeScanner } = Plugins;  
      //BarcodeScanner.hideBackground();
      const result = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.QR_CODE] });      
      if (result.hasContent) {        
        codigo = result.content;
        console.log('escaneado',codigo.length, this.CODIGO_50.length, codigo.trim().length);
        acreditado = this.determinarMontoAcreditado(codigo.trim());        
        this.scanActive = false;
        return {credit:acreditado,code:codigo} as ScanResult;
      }    
    }
    return {credit:0,code:''} as ScanResult; 
  }

  preapare(){
    const { BarcodeScanner } = Plugins;
    BarcodeScanner.prepare();  
  }

  stopScan(){
    const { BarcodeScanner } = Plugins;
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    this.scanActive = false;
  };

  determinarMontoAcreditado(lectura:string):number{
    let creditos = 0;        
    switch(lectura){
      case this.CODIGO_10 : 
        creditos = 10;
      break;
      case this.CODIGO_50 : 
        creditos = 50;
      break;
      case this.CODIGO_100 : 
        creditos = 100;
      break;
    }
    return creditos;
  }

  
  async checkPermition():Promise<boolean>{
    return new Promise(
      async (resolve, reject) =>{
        const { BarcodeScanner } = Plugins;
        const status = await BarcodeScanner.checkPermission({force:true});
        if(status.granted){
          resolve(true);
        }else{
          const c = confirm('Si desea otorgar permiso para usar su cámara, habilítelo en la configuración de la aplicación.',);
          if (c) {
            await BarcodeScanner.openAppSettings();
          }
          resolve(false);
        }
      });
  }
}
