import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/model/tournament';
import { DbService } from 'src/app/db.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Match } from 'src/app/model/match';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  tournament: Tournament | undefined;
  matchs: Match[]=[];
  private routeSub: Subscription | undefined;
  tournamentId:string ='';
  constructor(private router:ActivatedRoute, private dbService: DbService) { }

  ngOnInit(): void {
    this.getTournamentById();
    this.getTournamentMatch();
  }

  getTournamentById():void{
    this.routeSub = this.router.params.subscribe(params => {
      this.tournamentId = params['id'];
    });
    this.dbService.getTournamentById(this.tournamentId).subscribe(tournament => this.tournament = tournament)
    console.log(this.tournament )
  }

  getTournamentMatch():void{
    this.routeSub = this.router.params.subscribe(params => {
      this.tournamentId = params['id'];
    });
    this.dbService.displayMatchesByTournament(this.tournamentId).subscribe(matchs => this.matchs = matchs)
    console.log(this.matchs )
  }
}
