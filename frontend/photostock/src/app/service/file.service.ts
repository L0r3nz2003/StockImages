import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {User} from "../interfaces/user";
import {Observable, of, throwError} from "rxjs";
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
  upload(uploadForm: FormGroup, beschreibung: string,tags: string, user: User): Observable<string> {
    const formData = new FormData();
    formData.append('file', uploadForm.get('profile').value);

    let headers = new HttpHeaders().set('Authorization', "Bearer "+this.userService.getUser().token)

    this.http.post<any>(this.url + "img/upload?beschreibung=" + beschreibung + "&tags="+tags+"&uid="+user.id, formData, {headers}).subscribe(
      data => {
        return of("success");
      },
      error => {
        return of("error!");
      }
    );
    return of("error!");
  }
}
