import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string | undefined;
  authenticated!: boolean;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.data.title;
    this.authenticated=this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.userLogout();
    window.location.reload();
  }
}
