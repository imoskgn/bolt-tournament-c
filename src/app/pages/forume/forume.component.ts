import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from 'src/app/db.service';

@Component({
  selector: 'app-forume',
  templateUrl: './forume.component.html',
  styleUrls: ['./forume.component.css']
})
export class ForumeComponent implements OnInit {
  title: string | undefined;
  constructor(private dbService: DbService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.title = this.route.snapshot.data.title;
  }

}
