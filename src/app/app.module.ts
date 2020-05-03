import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';

import {CommonModule} from '@angular/common';

import {MatExpansionModule} from '@angular/material/expansion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent} from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

import { NavComponent } from './navigation/nav.component';
import { IncomeComponent } from './button/menu-buttons/income-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {TextFieldModule} from '@angular/cdk/text-field';



// import { AddPostComponent } from './add-post/add-post.component';

//import { DialogButton } from './button/blogs/blog-button.component';
import { IncomeCard } from './income-cards/income-card.component';
import { Blogs } from './button/blogs/blog-button.component';
import { ManagmentComponent } from './money-managment/managment-button.component';
import { PostsService } from './button/blogs/posts.service';
//import { Button } from 'protractor';
//import { IncomeGridComponent } from './incometax/gridview/grid.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    IncomeComponent,
    IncomeCard,
    Blogs,

    ManagmentComponent,
    //AddPostComponent,
    //DialogButton,
   // IncomeGridComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    HttpClientModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatIconModule,
    TextFieldModule,
    MatExpansionModule,
   // platformBrowserDynamic,
    //RouterModule.forRoot({
     // {path:'', component: IncomeComponent },
    //})
  ],
  entryComponents: [IncomeComponent, IncomeCard],
  //declarations: [IncomeGridComponent],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
  bootstrap: [AppComponent]
})
export class AppModule { }

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
