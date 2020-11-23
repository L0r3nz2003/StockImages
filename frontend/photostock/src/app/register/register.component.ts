import { Component, OnInit } from '@angular/core';
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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }


  register(name: any, password: any, password_repeat: any) {

    document.getElementById("error_password_repeat").innerHTML = "";
    document.getElementById("error_username").innerHTML = "";
    document.getElementById("error_password").innerHTML = "";


    if (!name.validity.valid) {
      name.style.borderColor = "red";
      document.getElementById("error_username").innerHTML = "Gebe einen gültigen Namen an!";
      return;
    }

    if (!password.validity.valid) {
      password.style.borderColor = "red";
      document.getElementById("error_password").innerHTML = "Gebe ein 8 Stelliges Passwort ein!";
      return;
    }

    if (!password_repeat.validity.valid) {
      password_repeat.style.borderColor = "red";
      document.getElementById("error_password_repeat").innerHTML = "Gebe das Passowort erneut ein!";
      return;
    }

    if(password_repeat.value !== password.value) {
      password_repeat.style.borderColor = "red";
      document.getElementById("error_password_repeat").innerHTML = "Das Passwort stimmt nicht überein!";
    }

    if(this.userService.isNameInUse(name.value)) {
      name.style.borderColor = "red";
      document.getElementById("error_username").innerHTML = "Der Name ist bereits belegt!";
      return;
    }

    const user: User = {name: name.value, password: password.value, anzBilder: 0};
    this.userService.addUser(user).subscribe(user => alert(user.password));



  }

}
