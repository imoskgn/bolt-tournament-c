import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { DbService } from 'src/app/db.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string | undefined;
  authenticated!: boolean;
  user: User | undefined;
  private routeSub: Subscription | undefined;
  userId:string ='';

  constructor(
    private route:Router,
    private authService: AuthService,
    private dbService: DbService,
    private router:ActivatedRoute, 
    ) { }

  ngOnInit(): void {
    this.title = this.router.snapshot.data.title;
    this.authenticated=this.authService.isAuthenticated();
  }

  /*getuserById():void{
    this.routeSub = this.router.params.subscribe(params => {
      this.userId = params['id'];
    });
    this.dbService.getUserById(this.userId).subscribe(user => this.user = user)
    console.log(this.user )
  }*/
  

  logout(): void {
    this.authService.userLogout();
    window.location.reload();
  }
}
