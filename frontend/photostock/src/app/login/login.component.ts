import {Component, OnInit} from '@angular/core';
import {isNullOrUndefined} from 'util';

import {UserService} from '../service/user.service';
import {environment} from "../../environments/environment";
import {AppComponent} from "../app.component";
import {PasswordRestoreService} from "../service/password-restore.service";
import {User} from "../interfaces/user";
import {ModalComponent} from "../modal/modal.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name;
  user;

  constructor(public userService: UserService, private passwordRestoreService: PasswordRestoreService, public router: Router) {}

  ngOnInit(): void {

  }

  async forgotPassword(email: any, passwordReset: ModalComponent) {

    //forgot password?
    if (isNullOrUndefined(email.value) || !email.validity.valid) {
      email.style.borderColor = "red";
      document.getElementById("error_username").innerHTML = "Gebe einen gültige E-Mail Adresse an!";
      return;
    }

    this.passwordRestoreService.restore(email.value);
    passwordReset.currentHidden = false;
  }

  login(email: HTMLInputElement, password: HTMLInputElement, modal: ModalComponent) {

    email.style.borderColor = "";
    password.style.borderColor = "";
    document.getElementById("error_username").innerHTML = "";
    document.getElementById("error_password").innerHTML = "";

    //is email valid?
    if (isNullOrUndefined(email.value) || !email.validity.valid) {
      email.style.borderColor = "red";
      document.getElementById("error_username").innerHTML = "Gebe einen gültige E-Mail Adresse an!";
      return;
    }

    //if contains spaces
    if(email.value.indexOf(' ') >= 0) {
      email.style.borderColor = "red";
      document.getElementById("error_username").innerHTML = "Deine E-Mail enthält ungültige Zeichen!";
      return;
    }

    //is password valid
    if (isNullOrUndefined(password.value) || !password.validity.valid) {
      password.style.borderColor = "red";
      document.getElementById("error_password").innerHTML = "Gebe ein 8 Stelliges Passwort ein!";
      return;
    }


    //match the email with password?
    this.userService.isMatch(email.value, password.value).subscribe(exist  => {
      if(exist) {
        modal.currentHidden = false;
      } else {
        email.style.borderColor = "red";
        document.getElementById("error_username").innerHTML = "E-Mail/Passwort falsch!";
        document.getElementById("error_password").innerHTML = "E-Mail/Passwort falsch!";
        password.style.borderColor = "red";
      }
    });
  }


}
