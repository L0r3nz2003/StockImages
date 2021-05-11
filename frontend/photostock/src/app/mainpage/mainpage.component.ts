import { Component, OnInit } from '@angular/core';
import {ImagedisplayService} from "../service/imagedisplay.service";

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})


export class MainpageComponent implements OnInit {

  time: number;
  static images: Array<string>
  imageServer: ImagedisplayService;

  constructor(imageServer: ImagedisplayService) {
    this.time = 0;
    this.imageServer = imageServer;
    MainpageComponent.images = new Array<string>();


    imageServer.getImages().then(function (json) {
      for (let i = 0; i < json.length; i++) {
        MainpageComponent.images.push(json[i]);
        MainpageComponent.images.push(json[i]);
      }
    });
  }

  ngOnInit(): void {
  }

  getImages() {
    return MainpageComponent.images;
  }

  /**
   *  <div *ngFor='let i of getImages();'>
   <img src='{{i}}' class="tile-image">
   </div>
   */

  getRowsCount(): Array<number> {

    console.log(this.imageServer.getImageCount());

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

}
