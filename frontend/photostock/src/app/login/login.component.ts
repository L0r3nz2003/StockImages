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
    var username: string = document.getElementById('inputusername').innerHTML;
    var password: string = document.getElementById('inputPassword').innerHTML;

    if(isNullOrUndefined(username) || username.length == 0) {
      //TODO: output message;
        return;
    }

    if(isNullOrUndefined(password) || password.length == 0) {
      //TODO: output message;
        return;
    }


  }


}
