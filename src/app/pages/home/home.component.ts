import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/model/tournament';
import { DbService } from 'src/app/db.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tournaments: Tournament[]=[];
  title: string | undefined;
  router: any;
  constructor(private dbService: DbService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTournaments();
    this.title = this.route.snapshot.data.title;
  }

  getTournaments():void{
    this.dbService.getTournaments().subscribe(tournaments => this.tournaments = tournaments)
    console.log(this.tournaments)
  }
  checkPlayerRegistered( t : Tournament): void{ 
    let playerName : any | undefined;
    playerName = t.playersList;
   // var registered : boolean = true;
    for (let i = 0; i < playerName.length; i++) {
      if (playerName[i].name =="")
        {this.router.navigate(['/update/', t._id])
        break;}
      else {
        t.status = "started";
        this.dbService.updtTournament(t);
       // this.dbService.createMatch(t);
        //this.router.navigate(['/detail/', t._id]) 
      }
    } 
  }
}