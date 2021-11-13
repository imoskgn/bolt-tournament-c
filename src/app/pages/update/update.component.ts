import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Tournament } from 'src/app/model/tournament';
import { DbService } from 'src/app/db.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  tournament?: Tournament;
  tournaments: Tournament[] = [];
  private routeSub: Subscription | undefined;
  tournamentId: string = '';

  constructor(
    private router: ActivatedRoute,
    private dbService: DbService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.getTournament();
    this.tournament = this.tournaments[0];
  }
  getTournament(): void {
    this.routeSub = this.router.params.subscribe((params) => {
      this.tournamentId = params['id'];
    });
    this.dbService
      .getTournamentById(this.tournamentId)
      .subscribe((tournament) => (this.tournaments[0] = tournament));
    console.log(this.tournament);
  }

  onSubmit(data: NgForm) {
    console.log(data);

    let _id: string = this.tournamentId;
    this.tournaments[0].name = data.value.tournamentName;
    let userId: string =  '';
    let description: string = data.value.tournamentDesc;
    let status: string = 'created';
    let startDate: Date = data.value.startDate;
    let endDate: Date = data.value.endDate;
    let level: string = '1';

    let player1 = {
      phoneNumber: data.value.player1Phone,
      name: data.value.player1Name,
    };

    let player2 = {
      phoneNumber: data.value.player2Phone,
      name: data.value.player2Name,
    };

    let player3 = {
      phoneNumber: data.value.player3Phone,
      name: data.value.player3Name,
    };

    let player4 = {
      phoneNumber: data.value.player4Phone,
      name: data.value.player4Name,
    };

    let playerList = [player1, player2, player3, player4];
    
    
    console.log(this.tournaments[0]);
    this.dbService.updtTournament(this.tournaments[0]);
    this.route.navigate(['/home']);
  }
}