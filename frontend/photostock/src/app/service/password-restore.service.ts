import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "../message.service";

@Injectable({
  providedIn: 'root'
})
export class PasswordRestoreService {

  private url = 'http://localhost:3000/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }


  restore(email: string): void {
    this.http.post(this.url + "mail/forgot-password?email=" + email, null).subscribe(
      error => {
        console.log(error);
      }
    );
  }

  updateOldPassword(token: string, pwd1: string, pwd2: string, id: number) {

    let header = new HttpHeaders({
      'Authorization': token
    });

    let data = {
      'password': pwd1,
      'password2': pwd2
    }

    this.http.post(this.url + "mail/reset-password?id="+id + "&token="+token, data).subscribe(
      error => {
        console.log(error);
      }
    );
  }

}