import { Component, OnInit } from '@angular/core';
import {ImagedisplayService} from "../service/imagedisplay.service";



@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})


export class MainpageComponent implements OnInit {

  time: number;
  messageLevel: number;
  message: string;
  loaded: boolean;

  static images: Array<string>
  imageServer: ImagedisplayService;

  constructor(imageServer: ImagedisplayService) {

    this.loaded = false;
    this.messageLevel = 3;
    this.message = "Bilder werden geladen...."
    this.time = 0;
    this.imageServer = imageServer;
    MainpageComponent.images = new Array<string>();


    imageServer.getImages().then(function (json) {
      for (let i = 0; i < json.length; i++) {
        MainpageComponent.images.push(json[i].url);
      }
    }).catch(e => {
        this.messageLevel = 4;
        this.message = "Es ist ein Fehler beim holen der Bilder aufgetreten! " + e;
        return;
    }).then(() => {
      this.loaded = true;
    });
  }

  ngOnInit(): void {
  }

  getImages() {
    return MainpageComponent.images;
  }

  getRowsCount(): Array<number> {
    return Array(Math.ceil(8/ 5));
  }

  getImagesByRow(row: number): Array<string> {
    let section = new Array<string>();
    for(let i = 0; i < 5; i++) {
      section[i] = MainpageComponent.images[i + (row*5)];
    }
    return section;
}

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  search($event: MouseEvent, button: HTMLButtonElement, input: HTMLInputElement) {
    this.loaded = false;
    this.imageServer.getImagesByTag(input.value).then(function (json) {
      MainpageComponent.images = new Array<string>();
      for (let i = 0; i < json.length; i++) {
        MainpageComponent.images.push(json[i].url);
      }
    }).catch(e => {
      this.messageLevel = 4;
      this.message = "Es ist ein Fehler beim holen der Bilder aufgetreten! " + e;
      return;
    }).then(() => {
      this.loaded = true;
    });
  }
}
