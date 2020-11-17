import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';

import { User } from '../interfaces/user';
import { UserService } from '../user.service';
import { cwd } from 'process';

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

  login(name: any, password: any) {

    name.style.borderColor = "";
    password.style.borderColor = "";

    if(isNullOrUndefined(name.value) || !name.validity.valid) {
        name.style.borderColor = "red";
        console.log("non valid username!");
        return;
    }

    if(isNullOrUndefined(password.value) || !password.validity.valid) {
          password.style.borderColor = "red";
          console.log("non valid password!");
        return;
    }

    let user = this.userService.getUserByName(name.value);
    
    console.log(user.name);
    console.log(user.password);
  }

  
}
