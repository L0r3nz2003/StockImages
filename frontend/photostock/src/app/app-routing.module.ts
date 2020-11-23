import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { LoginComponent } from './login/login.component';
import {RegisterComponent} from "./register/register.component";


const routes: Routes = [
  { path: 'upload', component: UploadComponent},
  { path: '', component: MainpageComponent },   //upload
  { path: 'user', component: UserComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/register', component: RegisterComponent }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
