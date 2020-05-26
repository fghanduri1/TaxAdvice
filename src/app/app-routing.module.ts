import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncomeCard } from './income-cards/income-card.component';
import { IncomeComponent } from './button/menu-buttons/income-button.component';
import { Blogs } from './button/blogs/blog-button.component';
//import { AddPostComponent } from './add-post/add-post.component';
import { ManagmentComponent } from './money-managment/managment-button.component';
// import { PostListComponent } from './button/blogs/new-blog/post-list/post-list.component';
import { PostsService } from '../app/button/blogs/posts.service';

//specifying page paths by class and button clicked 
const routes: Routes = [
  { path : '', component: IncomeComponent },
  { path:'income', component: IncomeCard },
  { path:'blog', component: Blogs },
  { path:'managment', component: ManagmentComponent },
  { path: 'edit/:postId', component: Blogs},
  // { path:'blog', component:PostListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
