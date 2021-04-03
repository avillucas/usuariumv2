import { Component, OnInit } from '@angular/core';
import { AuthapiService } from '../services/authapi.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  isSubmitted:boolean;
  ionicRegister: FormGroup;
  errorMessage:string;  

  constructor(
    private authService : AuthapiService,    
    public formBuilder: FormBuilder,
    public toastController: ToastController
  ) { 
    this.isSubmitted = false;
  }
    
  ngOnInit() {
    this.errorMessage = '';    
    this.isSubmitted = false;    
    this.ionicRegister = this.formBuilder.group({
      username: ['tst@tester.com', [Validators.required, Validators.minLength(4), Validators.email]],
      password: ['tester', [Validators.required, Validators.minLength(4)]],
      confirm: ['tester', [Validators.required, Validators.minLength(4)]]
   })
  }

  checkPassSame() {
    let pass = this.ionicRegister.value.password;
    let passConf = this.ionicRegister.value.confirm;
    if(pass == passConf && this.ionicRegister.valid === true) {
      this.errorMessage = "";
      return false;
    }else {
      this.errorMessage = "Password did not match.";
      return true;
    }
  }

  async presentToast(message,color) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      color,
      position:'top'
    });
    toast.present();
  }

  get errorControl() {
    return this.ionicRegister.controls;
  }

  register(){
    this.isSubmitted = true;
    if (!this.ionicRegister.valid) {            
      this.presentToast('Por favor revise los datos ingresados.','danger');
      return false;
    } else {
      this.authService.register(this.ionicRegister.value).subscribe(
        (res)=>{                       
        console.log(res)          ;
        if(res.message == 'ok'){                            
          this.presentToast('El usuario pudo ser creado.','success');
          return true;
        }else{
          this.presentToast('El usuario no pudo ser creado.','danger');
          return false;
        }      
      });
    }
  }

}
