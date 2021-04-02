import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthapiService } from '../services/authapi.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isSubmitted:boolean;
  ionicForm: FormGroup;

  constructor(
    private authService : AuthapiService,
    private router : Router,
    public formBuilder: FormBuilder,
    public toastController: ToastController
  ) { 
    this.isSubmitted = false;
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      color:'danger',
      position:'top'
    });
    toast.present();
  }
  
  get errorControl() {
    return this.ionicForm.controls;
  }

  ngOnInit() {
    this.isSubmitted = false;
    this.ionicForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
   })
  }

  login(){    
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {            
      this.presentToast('Por favor revise los datos ingresados.');
      return false;
    } else {
      this.authService.login(this.ionicForm.value).subscribe(
        (res)=>{                                  
        if(res.token){                  
          this.router.navigateByUrl('dashboard/tab1');
          return true;
        }else{
          this.presentToast('El usuario y/o contraseña son incorrectas.');
          return false;
        }      
     });
    }
  }

}
