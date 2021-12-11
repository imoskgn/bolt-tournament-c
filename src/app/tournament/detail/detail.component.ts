import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Tournament } from 'src/app/model/tournament';
import { DbService } from 'src/app/db.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Match } from 'src/app/model/match';
import { MatchWinner } from 'src/app/model/match_winner';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  tournament: Tournament = new Tournament();

  matches: [] = [];
  m: Match[][] = [];
  level : number=1;
  winnersEditing: boolean=false;
  champion: String = "";
  subchampion: String = "";
  lastMatch: Match | undefined;
  private routeSub: Subscription | undefined;
  tournamentId:string ='';
  loggedUser:User | undefined;
  jwt: string | null | undefined;

  constructor(private router:ActivatedRoute, private dbService: DbService, private route:Router) { }
    

  ngOnInit(): void {
    this.getTournamentById();
    this.getMatchesByTournamentId();    
    this.loggedUser = JSON.parse(JSON.stringify(localStorage.getItem('user') || ''));
    this.loggedUser = JSON.parse(JSON.stringify(localStorage.getItem('user') || ''));
    this.jwt = localStorage.getItem('jwt');
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
      
      
      this.getTournamentLevel();
    })
  }

  loadWinnersEditing() {
    this.winnersEditing = true;
  }

  closeWinnersEditing() {
    this.winnersEditing = false;
  }
  public equalThanLevel(mLvl : number){
    if(mLvl<this.level || mLvl>this.level)
      return false;
    else
      return true;
  }
  winnerPlayer(match : Match, player : number){
    
    if(player==1){
      if(match.firstPlayer
         && match.winner
         && match.firstPlayer.phoneNumber==match.winner.phoneNumber){           
        console.log("WINNER: "+match.firstPlayer.phoneNumber);
        return true;
      }
    }
    if(player==2){
      if(match.secondPlayer 
        && match.winner
        && match.secondPlayer.phoneNumber==match.winner.phoneNumber){
          console.log("WINNER: "+match.secondPlayer.phoneNumber);
        return true;
      }
    }
    return false;
  }
  updateWinner(match : Match, lvl : number, ord : number, player : number){
    let newLevel =  lvl + 1;
    let newOrder= Math.ceil(ord/2);
    let newPlayer = (ord % 2) == 0? 2: 1;
    console.log("newLevel: "+newLevel);
    console.log("newOrder: "+newOrder);
    console.log("newPlayer: "+newPlayer);
    
    let winner = new  MatchWinner();
    winner.level=lvl;
    winner.order=ord;
    if(lvl<3){      
      let matchUpdate = new  MatchWinner();
      matchUpdate.level=newLevel;
      matchUpdate.order=newOrder;
      if(player==1){
        winner.winner=match.firstPlayer      
        if(newPlayer==1){
          matchUpdate.firstPlayer=match.firstPlayer;    
          matchUpdate.secondPlayer = this.m[newLevel-1][newOrder-1].secondPlayer;
        }
        if(newPlayer==2){
          matchUpdate.secondPlayer=match.firstPlayer;
          matchUpdate.firstPlayer = this.m[newLevel-1][newOrder-1].firstPlayer;
        }
      }
      if(player==2){
        winner.winner=match.secondPlayer     
        if(newPlayer==1){
          matchUpdate.firstPlayer=match.secondPlayer;
          matchUpdate.secondPlayer = this.m[newLevel-1][newOrder-1].secondPlayer;
        }
        if(newPlayer==2){
          matchUpdate.secondPlayer=match.secondPlayer;
          matchUpdate.firstPlayer = this.m[newLevel-1][newOrder-1].firstPlayer;
        }
      }
      this.dbService.updateWinner(winner,match._id!).subscribe( any => {
        this.dbService.updateMatch(matchUpdate,this.tournament._id).subscribe( any => {
            this.ngOnInit();
        });
      });  
    }else{
      if(player==1){
        winner.winner=match.firstPlayer      
      }
      if(player==2){
        winner.winner=match.secondPlayer     
      }
      this.dbService.updateWinner(winner,match._id!).subscribe( any => {
          this.ngOnInit();     
          this.checkIfCompleted();
      });   
    }
     
  }  

  checkIfCompleted(){
    if (this.level==4){
      this.tournament.status = "completed";
      this.dbService.updtTournament(this.tournament);
    }
  }
  

  getTournamentLevel() {
    console.log("Matches review");
    console.log("Matches levels length: "+this.matches.length);
    this.m=[];
    for( let i=0 ; i < this.matches.length;i++){
      let matchlevel : Match[] = this.matches[i];
      this.m[i]=[];
      let lvlCount=matchlevel.length;
      console.log("Matches length: "+matchlevel.length);
      for( let j=0 ; j < matchlevel.length;j++){ 
        if(matchlevel[j].level! && matchlevel[j].order!){
          this.m[i][j]=matchlevel[j];
          console.log("Match["+(i)+"]["+(j)+"]"+this.m[i][j].level +"-"+this.m[i][j].order);
          if(this.m[i][j].firstPlayer && this.m[i][j].secondPlayer){
            lvlCount=lvlCount-1;
            console.log("lvlCount: "+lvlCount);
            if(lvlCount==0){              
              this.level = this.m[i][j].level!;              
              console.log("  Level: "+this.level);
            }
            if(this.level==3 && this.m[i][j].winner){
              this.level=4;
              this.champion = this.m[i][j].winner.name;
              if(this.m[i][j].winner.phoneNumber == this.m[i][j].firstPlayer.phoneNumber){
                this.subchampion = this.m[i][j].secondPlayer.name;
              }else{
                this.subchampion = this.m[i][j].firstPlayer.name;
              }
              this.tournament.status = "completed";
              this.dbService.updtTournament(this.tournament);
              this.checkIfCompleted();
            }
          } 

        }
      }
      
    }
  }
  
    
  startTournament( t : Tournament): void{
    if(!this.jwt){
      alert("To start a tournament you should be logged in. \n Redirecting ....")
      this.route.navigate(['/login'])
      return;
    }
    // if(this.loggedUser?._id != t.userId){
    //   alert("You are not the owner of the tournament")
    //   this.route.navigate(['/home'])
    //   return;
    // }     
    let playerName : any | undefined;
    playerName = t.playersList;
    for (let i = 0; i < playerName.length; i++) {
      if (playerName[i].name =="" || playerName.length < 8)
        {this.route.navigate(['/update/', t._id])
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
      this.route.navigate(['/login'])
      return;
    }
    // if(this.loggedUser?._id != tournament.userId){
    //   alert("You are not the owner of the tournament")
    //   this.route.navigate(['/home'])
    //   return;
    // }
    this.route.navigate(['/delete/', tournament._id])
  }
  updateTournament( tournament : Tournament): void{     
    if(!this.jwt){
      alert("To perform an update you should be logged in. \n Redirecting ....")
      this.route.navigate(['/login'])
      return;
    }
    // if(this.loggedUser?._id != tournament.userId){
    //   alert("You are not the owner of the tournament")
    //   this.route.navigate(['/home'])
    //   return;
    // }
    this.route.navigate(['/update/', tournament._id])
  }
}
