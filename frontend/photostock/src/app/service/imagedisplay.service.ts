import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageService} from "./message.service";
import {User} from "../interfaces/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImagedisplayService {

  private url = 'http://localhost:3000/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient) {
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
    return fetch(this.url + "img/urls?userName="+name).then(function (response) {
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
