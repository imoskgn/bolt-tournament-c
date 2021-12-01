import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from 'src/app/db.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = {
    phoneNumber: '',
    name: '',
    password: '',
  };
  
  constructor(
    private dbService: DbService,
    private authService: AuthService,
    private router: ActivatedRoute,
    private route: Router
    ) { }

  ngOnInit(): void { 
    
  }

  submit():void{
    console.log("Inside Submit Method of login");
    this.authService.userLogin(this.loginForm);
   // this.route.navigate(['/landing']).then.call(window.location.reload());
  }
}

