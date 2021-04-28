import { Component, OnInit } from '@angular/core';
import { LectorqrService } from '../services/lectorqr.service';
import { SaldoService } from '../services/saldo.service';
import { Router } from '@angular/router';
import { AuthapiService } from '../services/authapi.service';
import { MenuController, ToastController } from '@ionic/angular';

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
    private menu: MenuController
  ) { }

  async presentToast(message:string, color:string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      color: color,
      position: 'top'
    });
    toast.present();    
  }

  
  escanearQr(){    
    const creditos = this.lectorqrService.escanear();
    console.log('escanear', creditos);
    if(creditos>0){
      this.acreditar(creditos)    ;  
    }
  }

  acreditar10(){
    this.acreditar(10);
  }

  acreditar50(){
    this.acreditar(50);
  }

  acreditar100(){
    this.acreditar(100);
  }

  protected acreditar(creditos:number){    
    //revisar lecturas previas y usuario revisar si ya cargo 10,50,o 100 y evitarlo a menos que sea admin .             
    const isAdmin = this.authService.isAdmin() ;    
     if(isAdmin || this.validarCarga(creditos)){              
      this.saldoService.cargarSaldo(creditos);
      this.presentToast('Se realizó la carga de '+creditos+' créditos.','success');      
    } else{
      this.presentToast('No puede cargar 2 veces el mismo monto.','danger');
    }  
  }

  validarCarga(creditoDeseado:number){
    const actual = this.saldoService.saldo;    
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

  ngOnInit() {
  }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

}
