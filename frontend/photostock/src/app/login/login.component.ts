import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';

import { User } from '../interfaces/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //users: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }

  login(): void {
    var username: HTMLElement = document.getElementById('inputusername');
    var password: HTMLElement = document.getElementById('inputPassword');

    if(isNullOrUndefined(username.innerHTML.length) || username.innerHTML.length == 0) {
        	username.style.borderColor = "red";
        return;
    }

    if(isNullOrUndefined(password.innerHTML.length) || password.innerHTML.length == 0) {
          username.style.borderColor = "red";
        return;
    }

    alert(name);
    if(!name){return;}
    this.userService.getUserByName(name)
    .subscribe(user => {
      this.userService.push(user)
    });
  }

}
