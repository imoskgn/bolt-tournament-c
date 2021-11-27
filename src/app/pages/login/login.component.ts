import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from 'src/app/db.service';

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
    private router: ActivatedRoute,
    private route: Router
    ) { }

  ngOnInit(): void { 
    
  }

  submit():void{
    this.dbService.userLogin(this.loginForm);
    this.route.navigate(['/landing']);
  }
}

