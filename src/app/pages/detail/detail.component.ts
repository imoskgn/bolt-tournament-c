import { Component, OnInit } from '@angular/core';
import { Tournament } from 'src/app/model/tournament';
import { DbService } from 'src/app/db.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  tournament: Tournament | undefined;

  constructor(private dbService: DbService) { }

  ngOnInit(): void {
  }

  getTournamentById(id: number):void{
    this.dbService.getTournament(id).subscribe(tournament => this.tournament = tournament)
    console.log(this.tournament )
  }
}
