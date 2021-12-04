import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from 'src/app/db.service';
import { Tournament } from 'src/app/model/tournament';
import { Post } from 'src/app/model/post';
import { NgForm } from '@angular/forms';
import { Post_create } from 'src/app/model/post_create';



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
    //alert(data.tournamentName);
    console.log(data);

    //let newP: Post = new Post('',data.value.title,data.value.content,'','',new Date())

    let newP= new Post();
    newP.title= data.value.title;
    newP.text= data.value.content;
    this.dbService.createPost(newP);
    console.log(newP);

    //this.router.navigate(['/forum']);


  }



}



