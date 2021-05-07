import { Component, OnInit } from '@angular/core';
import { LectorqrService } from '../services/lectorqr.service';
import { SaldoService } from '../services/saldo.service';
import { Router } from '@angular/router';
import { AuthapiService } from '../services/authapi.service';
import { MenuController, ToastController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { CreditApiService } from '../services/creditapi.service';
import { ScanResult } from '../entities/scanResult';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.page.html',
  styleUrls: ['./saldo.page.scss'],
})

export class SaldoPage implements OnInit {  

 

  constructor(
    public lectorqrService:LectorqrService,
    public saldoService:SaldoService,
    private authService: AuthapiService, 
    private router: Router,     
    public toastController:ToastController,
    private storageService:StorageService,
  ) {    
   }

  async presentToast(message:string, color:string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      color: color,
      position: 'top'
    });
    toast.present();    
  }

  async acreditar(resultado:ScanResult){    
    const isAdmin =  await this.storageService.isAdmin() ||false;    
    //revisar lecturas previas y usuario revisar si ya cargo 10,50,o 100 y evitarlo a menos que sea admin .                 
     if(isAdmin || this.saldoService.validarCarga(resultado.credit)){                     
      this.saldoService.cargarSaldo(resultado);
      this.presentToast('Se realizó la carga de '+resultado.credit+' créditos.','success');      
    } else{
      this.presentToast('No puede cargar 2 veces el mismo monto.','danger');
    }  
  }

  async ngOnInit() {
   this.saldoService.saldo = await this.storageService.saldo;
  }

  ngAfterViewInit() {
    this.lectorqrService.preapare();
  }  
  
  async escanearQr(){        
    const resultado = await this.lectorqrService.escanear();       
    if(resultado.credit != 0 ){
      this.acreditar(resultado)    ;  
    }
  }

  deternerScaner(){
    this.lectorqrService.stopScan();
  }

  ngOnDestroy() {
    this.lectorqrService.stopScan();
  }

  async logout() {
    this.lectorqrService.stopScan();
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
