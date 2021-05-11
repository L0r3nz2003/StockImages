import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "../message.service";
import {User} from "../interfaces/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class FileService {

  private url = 'http://localhost:3000/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }


  upload(file: FormData): void {
    this.http.post<any>(this.url + "img/upload", file).subscribe(
      data => console.log('success', data),
      error => {
        console.log(error);
        alert(error.error.error);
      }
    );
  }
}
