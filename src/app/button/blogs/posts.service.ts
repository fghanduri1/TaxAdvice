//this class organises the functions of the post section
//imports are initialised 
import { Post } from './post.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class PostsService{

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient){}

//this method would initialise retrieving all the posts from the server
//and would add them to the front end by specifying the url location 
  getPosts(){
    this.http.get<{message: string, posts: any}>('https://taxadvisor.herokuapp.com/api/posts'
    )
    .pipe(map((postData) =>{
      return postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        }
      });
    }))
    .subscribe(transformedPosts =>{
     this.posts= transformedPosts;
     this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  getPost(id: string){
    return this.http.get<{_id: string, title: string, content: string}>(
      'https://taxadvisor.herokuapp.com/api/posts/' + id
      );
  }

//this method would save these posts to the database and would send them to server side 
//the url api is also specified for the direction 
  addPost(title:string, content:string){
    const post:Post = {id: null, title: title, content: content};
    this.http.post<{message:string, postId: string }>('https://taxadvisor.herokuapp.com/api/posts', post)
      .subscribe((responseData) =>{
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

//this method is used to update the post when the user edits it 
//it would take the old post and keep the id
//when this post is re-edited the same id would be kept but the initial content would be wiped and the new would be resaved

  updatePost(id: string, title: string, content: string){
    const post: Post = {id: id, title:title, content: content };
    this.http.put('https://taxadvisor.herokuapp.com/api/posts/' + id, post)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
//this method is used when the user deletes a post
//it would take the id and remove the whole row associated with that id value and including it
  deletePost(postId: string){
    this.http.delete("https://taxadvisor.herokuapp.com/api/posts/" + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
