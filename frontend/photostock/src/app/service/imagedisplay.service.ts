import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {User} from "../interfaces/user";
import {Observable} from "rxjs";
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ImagedisplayService {

  private url = 'http://localhost:3000/';
  private userService;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient, private user: UserService) {
      this.userService = user;
  }

  async getImagesByTag(tag: string) {
    return fetch(this.url + "img/urls?all=false&tag="+tag+"&userName=null", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      if(response.status != 200) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }

  async deleteImage(id: number) {
  
    let headers = new HttpHeaders().set('Authorization', "Bearer "+this.userService.getUser().token)
    return this.http.delete(this.url + "img/delete?id="+id, {headers}).subscribe(() => console.log("deleted!"));
  }

  async getImagesByUser(user: string) {
    return fetch(this.url + "img/urls?all=false&tag=null&userName="+user, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      if(response.status != 200) {
        throw new Error(response.statusText);

      }

      return response.json();
    });
  }

  //get all images to display on the front page
  async getImages() {
    let http = new XMLHttpRequest();

    return fetch(this.url + "img/urls?all=true&tag=null&userName=null", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
        if(response.status != 200) {
          throw new Error(response.statusText);

        }

        return response.json();
      });
  }

  async getImageFromUser(name: string) {
    return fetch(this.url + "img/urls?all=false&tag=null&userName="+name).then(function (response) {
      return response.json();
    });
  }

  async getImageCount(): Promise<number> {
    let result;
    await this.getImages().then(function (json) {
      result = json;
    });

    return result.length;
  }
}
