import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Tournament } from 'src/app/model/tournament';
import { DbService } from 'src/app/db.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  tournament?: Tournament;
  tournaments: Tournament[]=[];
  private routeSub: Subscription | undefined;
  tournamentId:string ='';
  
  constructor(private router:ActivatedRoute, private dbService: DbService) { }


  ngOnInit(): void {
    this.getTournament();

  }

  getTournament():void{
    this.routeSub = this.router.params.subscribe(params => {
      this.tournamentId = params['id'];
    });
    this.dbService.getTournament(this.tournamentId).subscribe(tournament => this.tournaments[0] = tournament)
    console.log(this.tournament);
  }

}
