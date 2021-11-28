import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { DbService } from 'src/app/db.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm = {
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
    this.authService.userRegistration(this.registrationForm);
    this.route.navigate(['/login']);
  }
}
