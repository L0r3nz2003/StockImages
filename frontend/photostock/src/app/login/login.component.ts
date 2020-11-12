import { Component, OnInit } from '@angular/core';

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

  login(name: string):void {
    alert(name);
    /*if(!name){return;}
    this.userService.getUserByName(name)
    .subscribe(user => {
      this.users.push(user)
    })*/;

  }



}
