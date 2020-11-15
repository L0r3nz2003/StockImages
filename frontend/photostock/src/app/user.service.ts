import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './interfaces/user.js';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class UserService {

    private url = 'http://localhost:3000/heros';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService) { }


     getUserByName(name: string){
         console.log(name);
         /*
        if(!name.trim()){
            return;
        }

        const url = `${this.url+"/showbyname"}/${name}`;
        return this.http.get<User>(url)
            .pipe()
             */   
     }   





    
}