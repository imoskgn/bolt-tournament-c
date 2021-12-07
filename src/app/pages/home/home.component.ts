import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/model/tournament';
import { DbService } from 'src/app/db.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tournaments: Tournament[]=[];
  title: string | undefined;
  users: User[] | undefined;
  loggedUser: User | undefined;
  jwt: string | null | undefined;

  constructor(private dbService: DbService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getTournaments();
    this.title = this.route.snapshot.data.title;
    console.log(typeof(localStorage.getItem('user')))
    this.loggedUser = JSON.parse(JSON.stringify(localStorage.getItem('user') || ''));
    this.jwt = localStorage.getItem('jwt');
  }

  getTournaments():void{
    this.dbService.getTournaments().subscribe(tournaments => this.tournaments = tournaments)
    console.log(this.tournaments)
  }


  startTournament( t : Tournament): void{    
    if(!this.jwt){
      alert("To start a tournament you should be logged in. \n Redirecting ....")
      this.router.navigate(['/login'])
      return;
    }
    if(this.loggedUser?._id != t.userId){
      alert("You are not the owner of the tournament")
      this.router.navigate(['/home'])
      return;
    }
    let playerName : any | undefined;
    playerName = t.playersList;
    for (let i = 0; i < playerName.length; i++) {
      if (playerName[i].name =="" || playerName.length < 8)
        {this.router.navigate(['/update/', t._id])
        break;}
      else 
      {
        this.dbService.createMatch(t)
      }
    }
  }
  deleteTournament( tournament : Tournament): void{     
    if(!this.jwt){
      alert("To perform a delete you should be logged in. \n Redirecting ....")
      this.router.navigate(['/login'])
      return;
    }
    if(this.loggedUser?._id != tournament.userId){
      alert("You are not the owner of the tournament")
      this.router.navigate(['/home'])
      return;
    }
    this.router.navigate(['/delete/', tournament._id])
  }
  updateTournament( tournament : Tournament): void{     
    if(!this.jwt){
      alert("To perform an update you should be logged in. \n Redirecting ....")
      this.router.navigate(['/login'])
      return;
    }
    if(this.loggedUser?._id != tournament.userId){
      alert("You are not the owner of the tournament")
      this.router.navigate(['/home'])
      return;
    }
    this.router.navigate(['/update/', tournament._id])
  }
}