import {Component, OnInit} from '@angular/core';
import {isNullOrUndefined} from 'util';

import {User} from '../interfaces/user';
import {UserService} from '../user.service';
import {cwd} from 'process';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //users: User[];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {

  }

  async login(name: any, password: any) {

    name.style.borderColor = "";
    password.style.borderColor = "";

    if (isNullOrUndefined(name.value) || !name.validity.valid) {
      name.style.borderColor = "red";
      document.getElementById("error_username").innerHTML = "Gebe einen gültigen Namen an!";
      return;
    }

    if (isNullOrUndefined(password.value) || !password.validity.valid) {
      password.style.borderColor = "red";
      document.getElementById("error_password").innerHTML = "Gebe ein 8 Stelliges Passwort ein!";
      return;
    }


    if (await this.userService.isMatch(name.value, password.value)) {
      alert("Du wurdest angemeldet. //TODO");
    } else {
      name.style.borderColor = "red";
      document.getElementById("error_username").innerHTML = "Benutzername/Passwort falsch!";
      document.getElementById("error_password").innerHTML = "Benutzername/Passwort falsch!";
      password.style.borderColor = "red";
    }

  }


}
