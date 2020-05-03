import {Component, OnInit, OnDestroy } from '@angular/core';
//import { CommonModule } from '@angular/common';

import { Post } from './post.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { PostsService } from './posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'blog-button',
  templateUrl: 'blog-button.component.html',
  styleUrls: ['blog-button.component.css'],
})
export class Blogs implements OnInit, OnDestroy, OnInit{
  enteredTitle = "";
  enteredContent = "";
  private mode = 'create';
  private postId: string;
  post: Post;

 constructor(public postsService: PostsService, public route: ActivatedRoute){}



  onSavePost(form: NgForm){
    if (form.invalid){
      return
    }
    if(this.mode === 'create'){
      this.postsService.addPost(form.value.title,form.value.content);
    }else{
      this.postsService.updatePost(this.postId, form.value.title,form.value.content);
    }

    form.resetForm();
  }
  posts: Post[] = [];
  private postsSub: Subscription;

  // constructor(public postsService: PostsService){}

  ngOnInit(){
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts:Post[])=>{
        this.posts=posts;
      });
    this.route.paramMap.subscribe((paramMap: ParamMap) =>{
        if (paramMap.has('postId')){
          this.mode = 'edit';
          this.postId = paramMap.get('postId');
          this.postsService.getPost(this.postId).subscribe(postData =>{
              this.post = {id: postData._id, title: postData.title, content: postData.content};
          });
        }else{
          this.mode = 'create';
          this.postId = null;
        }
    });
  }

  onDelete(postId: string){
    this.postsService.deletePost(postId);

  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}
