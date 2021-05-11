import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PasswordRestoreService} from "../service/password-restore.service";

@Component({
  selector: 'app-password-restore',
  templateUrl: './password-restore.component.html',
  styleUrls: ['./password-restore.component.css']
})
export class PasswordRestoreComponent implements OnInit {

  modal_hidden: boolean = true;
  pwd_repeat_error: string;
  pwd_error: string;

  pwd_style: object;
  pwd_repeat_style: object;

  constructor(private route: ActivatedRoute, private router: Router, private restorePasswordService: PasswordRestoreService) { }
  token = null;
  id = null;

  ngOnInit(): void {

    this.route.queryParams.forEach(param => {
      this.token = param.token;
      this.id = param.id;
    });

    if(this.token === null || this.id == null) {
      this.router.navigate(['/']);
      return;
    }

  }

  reset(pwd: HTMLInputElement, pwd_repeat: HTMLInputElement) {

    this.pwd_style = {'border-color': 'green'}
    this.pwd_repeat_style = {'border-color': 'green'}
    this.pwd_error = "";
    this.pwd_repeat_error = "";


    if(!pwd.checkValidity()) {
      this.pwd_style = {'border-color': 'red'}
      this.pwd_error = "Das Passwort muss zwischen 8 und 20 Zeichen lang sein!";
      return;
    }

    if(!pwd_repeat.checkValidity()) {
      this.pwd_repeat_style = {'border-color': 'red'}
      this.pwd_repeat_error = "Das Passwort muss zwischen 8 und 20 Zeichen lang sein!";
      return;
    }

    if(pwd.value !== pwd_repeat.value) {
      this.pwd_style = {'border-color': 'red'}
      this.pwd_error = "Das Passwort stimmt nicht überein!";

      this.pwd_repeat_style = {'border-color': 'red'}
      this.pwd_repeat_error = "Das Passwort stimmt nicht überein!";
      return;
    }




    this.modal_hidden = false;
    this.restorePasswordService.updateOldPassword(this.token, pwd.value, pwd_repeat.value, this.id);
  }
}
