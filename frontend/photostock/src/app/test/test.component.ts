import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  userJson: any;

  constructor(public userServer: UserService) { }

  ngOnInit(): void {
    if(this.userServer.isLoggedIn()) {
      let user = this.userServer.getUser();
      this.userJson = {
        name: user.name,
        email: user.email,
        token: user.token,
        pics: user.pics
      }
    }
  }

}
