import { Component, OnInit, Input } from '@angular/core';
import {UserService} from "../service/user.service";
import {User} from "../interfaces/user";
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

  passwordBorderColor: string;
  passwordRepeatBorderColor: string;
  nameBorderColor: string;
  emailBorderColor: string;

  constructor(public userService: UserService, public router: Router) {
   }

  ngOnInit(): void {
  }

  /**
   * The register method is to add a new User.
   * @param name The name of the user
   * @param email  The email of the user
   * @param password  The password of the user
   * @param password_repeat The repeated password
   * @param modal The modal to announce if the action was successfull or not
   */
  register(name: any, email: any, password: any, password_repeat: any, modal: ModalComponent) {

    name.style.borderColor = "";
    password.style.borderColor = "";
    email.style.borderColor = "";
    password_repeat.style.borderColor = "";

    this.passwordBorderColor = "";
    this.passwordRepeatBorderColor = "";
    this.nameBorderColor = "";
    this.emailBorderColor = "";
  


    this.err_message_username = "";
    this.err_message_password = "";
    this.err_message_password_repeat = "";


    //is name valid
    if (!name.validity.valid) {
      this.nameBorderColor = "red";
      this.err_message_username = "Der Name muss 8 Zeichen oder länger sein!";
      return;
    }

    //is email valid
    if (!email.validity.valid) {
      this.emailBorderColor = "red";
      this.err_message_mail = "Gebe eine gültige E-Mail Adresse an!";
      return;
    }

    //has name invalid chars
    if(name.value.indexOf(' ') >= 0) {
      this.nameBorderColor = "red";
      this.err_message_username = "Der Name enthält ungültige Zeichen!";
      return;
    }

    //is password valid
    if (!password.validity.valid) {
      this.passwordBorderColor = "red";
      this.err_message_password = "Gebe ein 8 Stelliges Passwort ein!";
      return;
    }

    //is password repeat valid
    if (!password_repeat.validity.valid) {
      this.passwordRepeatBorderColor = "red";
      this.err_message_password_repeat = "Gebe das Passowort erneut ein!";
      return;
    }

    //is password similar to password repeat
    if(password_repeat.value !== password.value) {
      this.passwordRepeatBorderColor = "red";
      this.err_message_password_repeat = "Das Passwort stimmt nicht überein!";
      return;
    }

    //async funktion if name and email unique and does not exists already in the database!
    this.userService.isUnique(name.value, email.value).subscribe(r => {

      //if not unique
      if(!r) {
        this.emailBorderColor = "red";
        this.nameBorderColor = "red";

        this.err_message_username = "Der Name/Email ist bereits belegt!";
        this.err_message_mail = "Der Name/Email ist bereits belegt!";
        return;
        //if unique
      } else {

        //add new user
        const user: User = {
          name: name.value,
          email: email.value,
          password: password.value,
          pics: 0
        };
        this.userService.addUser(user).subscribe(result => {
          this.userService.setUser(result);
          modal.currentHidden = false;
        });
      }
    });
  }
}
