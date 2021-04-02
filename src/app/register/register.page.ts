import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthapiService } from '../services/authapi.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authService:AuthapiService , private router: Router) { }

  ngOnInit() {
  }

  register(form){
    this.authService.register(form.value).subscribe((res)=>{      
        this.router.navigateByUrl('tabs/tab1');
    });
  }
}
