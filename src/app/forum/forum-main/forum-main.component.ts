import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from 'src/app/db.service';
import { Tournament } from 'src/app/model/tournament';
import { Post } from 'src/app/model/post';
import { NgForm } from '@angular/forms';
import { PostCreate } from 'src/app/model/post_create';



@Component({
  selector: 'app-forum-main',
  templateUrl: './forum-main.component.html',
  styleUrls: ['./forum-main.component.css']
})
export class ForumMainComponent implements OnInit {
   
  tournaments: Tournament[]=[];
  posts: Post[]=[];
  title: string | undefined;
  constructor(private dbService: DbService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    //this.getTournaments();
    this.getAllPost();
    this.title = this.route.snapshot.data.title;
  }


  getAllPost():void{
    this.dbService.getPosts().subscribe(posts => this.posts = posts)
    console.log(this.posts)
  }


  onSubmit(data: NgForm) {
    console.log(data);

    let postTitle: string = data.value.postTitle;
    let postContent: string = data.value.postContent;

    let newPost: PostCreate = new PostCreate(
      postTitle,
      postContent
    );

    this.dbService.createPost(newPost);
    this.router.navigate(['/forum']);

  }
}



