import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {User} from './interfaces/user.js';
import {MessageService} from './message.service';


@Injectable({providedIn: 'root'})
export class UserService {

  private url = 'http://localhost:3000/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  async isMatch(name: string, password: string) {
    let http = new XMLHttpRequest();
    http.open("HEAD", this.url + "users/exists/"+name+"/" + password, false);
    http.send();
    if (http.status != 404) {
      return true;
    }
    return false;
  }

  isNameInUse(name: string): boolean {
    let http = new XMLHttpRequest();
    http.open('GET', this.url + "users/showbyname/" + name, false);
    http.send();
    if (http.status != 404) {
      console.log(http.responseText);
      return JSON.parse(http.responseText).length != 0;
    }
    return false;
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url+"users/create",user);

  }
}
