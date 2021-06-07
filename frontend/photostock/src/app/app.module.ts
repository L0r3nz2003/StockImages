import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { AppRoutingModule } from './app-routing.module';
import { UserComponent } from './user/user.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { PasswordRestoreComponent } from './password-restore/password-restore.component';
import { ModalComponent } from './modal/modal.component';
import { TestComponent } from './test/test.component';
import {NgxFileDropModule} from "ngx-file-drop";

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    UserComponent,
    MainpageComponent,
    LoginComponent,
    RegisterComponent,
    PasswordRestoreComponent,
    ModalComponent,
    TestComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxFileDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
