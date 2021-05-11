import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "./user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'StockImages';
  constructor(private router: Router, public userService: UserService) {
  }
}
