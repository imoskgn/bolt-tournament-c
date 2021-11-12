import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from 'src/app/partials/base-page/base-page.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent extends BasePageComponent implements OnInit {

  constructor(router:ActivatedRoute) { 
    super(router)
  }

  ngOnInit(): void {
  }

}
