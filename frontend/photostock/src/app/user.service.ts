import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of, Subject} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {User} from './interfaces/user.js';
import {MessageService} from './message.service';


@Injectable({providedIn: 'root'})
export class UserService {

  private url = 'http://localhost:3000/';
  private loggedInUser: User;

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  isMatch(name: string, password: string): Observable<boolean> {

    let subject = new Subject<boolean>();
    this.http.get<User>(this.url + "users/exists?email="+name+"&password=" + password).subscribe(
      data => {
      this.setUser(data);
      subject.next(true);
    },
    error => {
      subject.next(false);
    });
    return subject.asObservable();
  }

  isUnique(name: string, email: string): Observable<boolean> {
    let subject = new Subject<boolean>();

    this.http.get(this.url + "users/checkunique?name="+name+"&email="+email, {responseType: 'text'}).subscribe(data => {
      if(data === "OK") {
        subject.next(true);
      } else {
        subject.next(false);
      }
    }, error => subject.next(false));
    return subject;
  }

  addUser(user: User): Observable<User> {
    let subject = new Subject<User>();
    this.http.post<User>(this.url+"users/create",user).subscribe(() => {
      subject.next(user);
    });
    return subject.asObservable();
  }

  setUser(user: User) {
    this.loggedInUser = user;
  }

  getUser(): User {
    return this.loggedInUser;
  }

  isLoggedIn() {
    return this.loggedInUser != undefined;
  }

  private handleError() {
    return of(false);
  }
}
