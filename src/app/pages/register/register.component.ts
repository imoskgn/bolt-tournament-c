import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  submit():void{
    this.dbService.userRegistration(this.registrationForm);
    this.route.navigate(['/login']);
  }
}
