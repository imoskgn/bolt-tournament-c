import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Tournament } from 'src/app/model/tournament';
import { Player } from 'src/app/model/player';
import { DbService } from 'src/app/db.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  tournament: Tournament = new Tournament();
  tournaments: Tournament[] = [];
  private routeSub: Subscription | undefined;
  tournamentId: string = '';
  editable:boolean = false;

  constructor(
    private router: ActivatedRoute,
    private dbService: DbService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getTournament();
    // this.checkEditable();
    // if(this.tournaments[0].status == 'created'){
    //   this.editable = true;
    // }
    // else{
    //   this.editable = false;
    // }
    console.log(this.tournament);
    this.tournament = this.tournaments[0];
  }

  // checkEditable():void{
  //   console.log('Inside check')
  //   console.log(this.tournaments.length)
  //   if(this.tournaments[0].status=='created'){
  //     this.editable = true;
  //   }
  //   else{
  //     this.editable = false;
  //   }
  // }

  getTournament(): void {
    this.routeSub = this.router.params.subscribe((params) => {
      this.tournamentId = params['id'];
    });
    this.dbService
      .getTournamentById(this.tournamentId).subscribe(
      {
        next: (tournament) => {
          this.tournaments[0] = tournament;
          if(tournament.status == 'created'){this.editable = true}
        }
      }
      )
  }

  onSubmit(data: NgForm) {
    let _id: string = this.tournamentId;
    this.tournaments[0].name = data.value.tournamentName;
    this.tournaments[0].description = data.value.tournamentDesc;
    this.tournaments[0].startDate = data.value.startDate;
    this.tournaments[0].endDate = data.value.endDate;

    let playerList: Player[] = [];

    for(let i=0 ; i<= 8 ;i++){
      playerList.push({
        phoneNumber : data.value.player1Phone,
        name : data.value.player1Name
      })
    }
 


    playerList[0].phoneNumber = data.value.player1Phone;
    playerList[0].name = data.value.player1Name;

    playerList[1].phoneNumber = data.value.player2Phone;
    playerList[1].name = data.value.player2Name;

    playerList[2].phoneNumber = data.value.player3Phone;
    playerList[2].name = data.value.player3Name;

    playerList[3].phoneNumber = data.value.player4Phone;
    playerList[3].name = data.value.player4Name;
    
    playerList[4].phoneNumber = data.value.player5Phone;
    playerList[4].name = data.value.player5Name;
    
    playerList[5].phoneNumber = data.value.player6Phone;
    playerList[5].name = data.value.player6Name;
    
    playerList[6].phoneNumber = data.value.player7Phone;
    playerList[6].name = data.value.player7Name;
    
    playerList[8].phoneNumber = data.value.player8Phone;
    playerList[8].name = data.value.player8Name;

    this.tournaments[0].playersList = playerList;
    
    console.log(this.tournaments[0]);
    this.dbService.updtTournament(this.tournaments[0]);
    this.route.navigate(['/home']);
  }
}