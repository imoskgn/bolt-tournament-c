import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DbService } from 'src/app/db.service';
import { Router } from '@angular/router';
import {PostCreate} from '../../model/post_create'

@Component({
  selector: 'app-forum-create',
  templateUrl: './forum-create.component.html',
  styleUrls: ['./forum-create.component.css']
})
export class ForumCreateComponent implements OnInit {

  constructor(private dbService: DbService, private router: Router) {}

  ngOnInit(): void {}
  onSubmit(data: NgForm) {
    console.log(data);

    let postTitle: string = data.value.postTitle;
    let postContent: string = data.value.postContent;

    let newPost: PostCreate = new PostCreate(
      postTitle,
      postContent
    );

    this.dbService.createPost(newPost);
    this.router.navigate(['/forume']);

  }

}
