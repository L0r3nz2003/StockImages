import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './interfaces/user.js';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class UserService {

    private url = 'http://localhost:3000/';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService) { }


    getUserByName(name: string): User {
         console.log(name);
         let founds: User[];
         this.http.get<User>(this.url+"users/showbyname/"+name).forEach(s => console.log(s));
         return founds[0];
         //FIX wait for komma to implement getuser(name,passwort method)
     }   
}