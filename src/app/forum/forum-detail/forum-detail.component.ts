import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DbService } from 'src/app/db.service';
import { Post } from 'src/app/model/post';
import { Tournament } from 'src/app/model/tournament';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.css']
})
export class ForumDetailComponent implements OnInit {
  post: Post | undefined;
  postId: string = '';

  private routeSub: Subscription | undefined;
  constructor(private router: ActivatedRoute, private dbService: DbService, private route: Router) { }

  ngOnInit(): void {
    this.getPostById();

  }

  getPostById(): void {
    console.log("getting post by id ...")
    this.routeSub = this.router.params.subscribe(params => {
      this.postId = params['id'];
    });
    this.dbService.getPostById(this.postId).subscribe(post => this.post = post)
  }
}
