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

  emailMessage: string;
  emailBorderColor: string;

  passwordMessage: string;
  passwordBorderColor: string;

  constructor(public userService: UserService, private passwordRestoreService: PasswordRestoreService, public router: Router) {}

  ngOnInit(): void {

  }

  async forgotPassword(email: any, passwordReset: ModalComponent) {

    //forgot password?
    if (isNullOrUndefined(email.value) || !email.validity.valid) {
      this.emailBorderColor = "red";
      this.emailMessage = "Gebe einen gültige E-Mail Adresse an!";
      return;
    }

    this.passwordRestoreService.restore(email.value);
    passwordReset.currentHidden = false;
  }

  login(email: HTMLInputElement, password: HTMLInputElement, modal: ModalComponent) {

    this.emailBorderColor = "";
    this.emailMessage = "";
    this.passwordBorderColor = "";
    this.passwordMessage = "";

    //is email valid?
    if (isNullOrUndefined(email.value) || !email.validity.valid) {
      this.emailBorderColor = "red";
      this.emailMessage = "Gebe einen gültige E-Mail Adresse an!";
      return;
    }

    //if contains spaces
    if(email.value.indexOf(' ') >= 0) {
      this.emailBorderColor = "red";
      this.emailMessage = "Die E-Mail enthält ungültige Zeichen!";
      return;
    }

    //is password valid
    if (isNullOrUndefined(password.value) || !password.validity.valid) {
      this.passwordBorderColor = "red";
      this.passwordMessage = "Gebe ein 8 stelliges Passwort an!";
      return;
    }


    //match the email with password?
    this.userService.isMatch(email.value, password.value).subscribe(exist  => {
      if(exist) {
        modal.currentHidden = false;
      } else {
        this.passwordBorderColor = "red";
        this.passwordMessage = "E-Mail/Passwort falsch";

        this.emailBorderColor = "red";
        this.emailMessage = "E-Mail/Passwort falsch";
      }
    });
  }


}
