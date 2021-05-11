import { Component, OnInit, Input } from '@angular/core';
import {isNullOrUndefined} from "util";
import {UserService} from "../user.service";
import {User} from "../interfaces/user";
import {Observable} from "rxjs";
import {ModalComponent} from "../modal/modal.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  err_message_username: string = "";
  err_message_password: string = "";
  err_message_password_repeat: string = "";
  name: string;
  hide: boolean = true;
  err_message_mail: string = "";

  constructor(public userService: UserService, public router: Router) {
   }

  ngOnInit(): void {
  }

  register(name: any, email: any, password: any, password_repeat: any, modal: ModalComponent) {

    name.style.borderColor = "";
    password.style.borderColor = "";
    email.style.borderColor = "";
    password_repeat.style.borderColor = "";

    this.err_message_username = "";
    this.err_message_password = "";
    this.err_message_password_repeat = "";


    if (!name.validity.valid) {
      name.style.borderColor = "red";
      this.err_message_username = "Der Name muss 8 Zeichen oder länger sein!";
      return;
    }

    if (!email.validity.valid) {
      name.style.borderColor = "red";
      this.err_message_mail = "Gebe eine gültige E-Mail Adresse an!"
      return;
    }

    if(name.value.indexOf(' ') >= 0) {
      name.style.borderColor = "red";
      this.err_message_username = "Der Name enthält ungültige Zeichen!";
      return;
    }

    if (!password.validity.valid) {
      password.style.borderColor = "red";
      this.err_message_password = "Gebe ein 8 Stelliges Passwort ein!";
      return;
    }

    if (!password_repeat.validity.valid) {
      password_repeat.style.borderColor = "red";
      this.err_message_password_repeat = "Gebe das Passowort erneut ein!";
      return;
    }

    if(password_repeat.value !== password.value) {
      password_repeat.style.borderColor = "red";
      this.err_message_password_repeat = "Das Passwort stimmt nicht überein!";
      return;
    }

    this.userService.isUnique(name.value, email.value).subscribe(r => {

      if(!r) {
        name.style.borderColor = "red";
        email.style.borderColor = "red";
        this.err_message_username = "Der Name/Email ist bereits belegt!";
        this.err_message_mail = "Der Name/Email ist bereits belegt!";
      } else {
        const user: User = {
          name: name.value,
          email: email.value,
          password: password.value,
          pics: 0
        };
        this.userService.addUser(user).subscribe(result => {
          console.log(result + "a");
          this.userService.setUser(result);
          modal.currentHidden = false;
        });
      }
    });
  }
}
