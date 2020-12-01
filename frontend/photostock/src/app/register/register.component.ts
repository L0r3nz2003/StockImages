import { Component, OnInit, Input } from '@angular/core';
import {isNullOrUndefined} from "util";
import {UserService} from "../user.service";
import {User} from "../interfaces/user";
import {Observable} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  err_message_username: string = "";
  err_message_password: string = "";
  err_message_password_repeat: string = "";

  constructor(private userService: UserService) {
   }

  ngOnInit(): void {
  }

  register(name: any, password: any, password_repeat: any) {

    name.style.borderColor = "";
    password.style.borderColor = "";
    password_repeat.style.borderColor = "";

    this.err_message_username = "";
    this.err_message_password = "";
    this.err_message_password_repeat = "";


    if (!name.validity.valid) {
      name.style.borderColor = "red";
      this.err_message_username = "Der Name muss 8 Zeichen oder länger sein!";
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

    if(this.userService.isNameInUse(name.value)) {
      name.style.borderColor = "red";
      this.err_message_username = "Der Name ist bereits belegt!";
      return;
    }

    const user: User = {name: name.value, password: password.value, pics: 0};
    this.userService.addUser(user).subscribe(user => alert(user.password));
    document.getElementById('id01').style.display="block";
  }

}
