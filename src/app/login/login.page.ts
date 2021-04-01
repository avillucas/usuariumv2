import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isSubmitted:boolean;
  ionicForm: FormGroup;
  alert:AlertController

  constructor(
    private authService : AuthService,
    private router : Router,
    public formBuilder: FormBuilder,
    public alertController: AlertController
  ) { 
    this.isSubmitted = false;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error de validación',
      subHeader: 'Revise los datos',
      message: 'Por favor revise los datos ingresados.',
      buttons: ['OK']
    });

    await alert.present();
  }
  get errorControl() {
    return this.ionicForm.controls;
  }

  ngOnInit() {
    this.isSubmitted = false;
    this.ionicForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(4), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
   })
  }

  login(){
    console.log(this.ionicForm.value);
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {            
      this.presentAlert();
      return false;
    } else {
      this.authService.login(this.ionicForm.value).subscribe((res)=>{        
        if(res.loguedIn){        
          this.router.navigateByUrl('tabs/tab1');
      }      
     });
    }
  }

}
