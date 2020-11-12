import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  login() {
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

    //TODO Backend login



  }


}
