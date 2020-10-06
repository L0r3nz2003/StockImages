import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component'; 


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', },
  { path: 'upload', component: UploadComponent }, 
  {path: 'user', component: UserComponent }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
