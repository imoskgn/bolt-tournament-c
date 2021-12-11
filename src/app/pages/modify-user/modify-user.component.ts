import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent implements OnInit {
  modifyUserForm = {
    name: '',
  };

  userPhoneNumber = {
    phoneNumber: '',
  };

  userId!:string;
  
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.modifyUserForm.name=localStorage.getItem('name') as string;
    this.userPhoneNumber.phoneNumber=localStorage.getItem('phoneNumber') as string;
  }

  submit():void{
    this.authService.updateUserInfo(localStorage.getItem('_id') as string,this.modifyUserForm);
    localStorage.setItem('name',this.modifyUserForm.name);
  }
}
