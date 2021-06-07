import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {User} from "../interfaces/user";
import {Observable, of} from "rxjs";
import {FormGroup} from "@angular/forms";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})

export class FileService {

  private url = 'http://localhost:3000/';



  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private userService: UserService
    ) {
  }


  //upload image
  upload(uploadForm: FormGroup): Observable<boolean> {
    const formData = new FormData();
    formData.append('file', uploadForm.get('profile').value);

    let httpOptions = {
      headers: new HttpHeaders({'x-access-token': this.userService.getUser().token})
    };

    this.http.post<any>(this.url + "img/upload", formData, httpOptions).subscribe(
      data => {
        console.log('success', data);
        return of(true);
      },
      error => {
        console.log(error);
        return of(false);
      }
    );
    return of(false);
  }
}
