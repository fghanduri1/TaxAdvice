//in this class the front end is completed for the blogging page 
//where imports for all the modules used are added initially 


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
//post values are assigned and gathered from the user on the front end
export class Blogs implements OnInit, OnDestroy, OnInit{
  enteredTitle = "";
  enteredContent = "";
  private mode = 'create';
  private postId: string;
  post: Post;

//post service class is used and an activated route is added
 constructor(public postsService: PostsService, public route: ActivatedRoute){}


//when a user clicks the save post button, the ngFrom is processed 
//if this form is invalid then it wouldn't return anything 
//if it is valid then it would take in what the user entered and would send to backend
//the form is then reset
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

//parammap is used and provides access to the required and optional parameters specific to a route. The map supports retrieving a single value with get() or multiple values
// The subscribe() call returns a Subscription object
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
//method for when the user wants to delete a poar
  onDelete(postId: string){
    this.postsService.deletePost(postId);

  }

  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}
