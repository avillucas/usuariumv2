import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthapiService } from '../services/authapi.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isSubmitted: boolean;
  ionicForm: FormGroup;

  constructor(
    private authService: AuthapiService,
    private router: Router,
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    private loadingController: LoadingController
  ) {
    this.isSubmitted = false;
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      color: 'danger',
      position: 'top'
    });
    toast.present();
  }

  ngOnInit() {
    this.isSubmitted = false;
    this.ionicForm = this.formBuilder.group({
      username: ['admin@tester.com.ar', [Validators.required, Validators.minLength(4), Validators.email]],
      password: ['admin', [Validators.required, Validators.minLength(4)]],
    })
  }

  get username() {
    return this.ionicForm.get('username');
  }

  get password() {
    return this.ionicForm.get('password');
  }

  async login() {
    //
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      this.presentToast('Por favor revise los datos ingresados.');
      return false;
    } else {
      const loading = await this.loadingController.create();
      await loading.present();
      //
      this.authService.login(this.ionicForm.value).subscribe(
        async (res) => {
          await loading.dismiss();
          this.router.navigateByUrl('/dashboard', { replaceUrl: true });
        },
        async (res) => {
          await loading.dismiss();
          await this.presentToast('Usuario o password incorrecto.');
        }

      );
    }
  }

}
