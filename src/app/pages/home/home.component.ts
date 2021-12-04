import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/model/tournament';
import { DbService } from 'src/app/db.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tournaments: Tournament[]=[];
  title: string | undefined;
  constructor(private dbService: DbService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getTournaments();
    this.title = this.route.snapshot.data.title;
  }

  getTournaments():void{
    this.dbService.getTournaments().subscribe(tournaments => this.tournaments = tournaments)
    console.log(this.tournaments)
  }

  startTournament( t : Tournament): void{     
    this.dbService.createMatch(t).subscribe( any => {
      this.ngOnInit();
    });
  }
}