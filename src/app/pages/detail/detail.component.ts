import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Tournament } from 'src/app/model/tournament';
import { DbService } from 'src/app/db.service';
import { ActivatedRoute, ParamMap, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import { Match } from 'src/app/model/match';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  tournament: Tournament | undefined;
  matches: [] = [];
  winnersEditing: boolean=false;
  lastMatch: Match | undefined;
  private routeSub: Subscription | undefined;
  tournamentId:string ='';
  @ViewChild('btnradio11P1') myDiv: ElementRef | undefined;
  constructor(private router:ActivatedRoute, private dbService: DbService) { }

  ngOnInit(): void {
    this.getTournamentById();
    this.getMatchesByTournamentId();
  }

  getTournamentById():void{
    this.routeSub = this.router.params.subscribe(params => {
      this.tournamentId = params['id'];
    });
    this.dbService.getTournamentById(this.tournamentId).subscribe(tournament => this.tournament = tournament)
    console.log(this.tournament )
  }

  getMatchesByTournamentId():void{
    this.routeSub = this.router.params.subscribe(params => {
      this.tournamentId = params['id'];
    });
    this.dbService.getMatchesByTournamentId(this.tournamentId).subscribe(matches => {
      this.matches = matches
      this.lastMatch = matches[matches.length - 1][0];

    })
  }

  loadWinnersEditing() {
    this.winnersEditing = true;
  }
  ngAfterViewInit() {
    if(this.myDiv){
      
      console.log(this.myDiv.nativeElement.innerHTML);
    }else{
      console.log('Undefined id');
    }
    
  }
}
