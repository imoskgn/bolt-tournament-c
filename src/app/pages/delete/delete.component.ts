import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DbService } from 'src/app/db.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  private routeSub: Subscription | undefined;
  tournamentId:string = '';

  constructor(private router: ActivatedRoute,private dbService: DbService,private route: Router) { }

  ngOnInit(): void {
    this.deleteTournament();
  }

  deleteTournament():void{
    this.routeSub = this.router.params.subscribe((params) => {
      this.tournamentId = params['id'];
    });
    this.dbService.deleteTournament(this.tournamentId);
    this.route.navigate(['/home']);
  }

}
