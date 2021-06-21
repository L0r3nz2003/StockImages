import { Component, OnInit } from '@angular/core';
import {ImagedisplayService} from "../service/imagedisplay.service";
import {
  GalleryModule,
  GridLayout,
  Image,
  LineLayout,
  PlainGalleryConfig,
  PlainGalleryStrategy
} from "@ks89/angular-modal-gallery";
import {ModalGalleryComponent} from "@ks89/angular-modal-gallery/lib/components/modal-gallery/modal-gallery.component";



@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})


export class MainpageComponent implements OnInit {
  static UPDATE_INTERVAL = 30000;


  time: number;
  messageLevel: number;
  message: string;
  loaded: boolean;

  lastUpdated = 0;

  plainGalleryGrid: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.GRID,
    layout: new GridLayout({ width: '500px', height: '500px' }, { length: 3, wrap: true })
  };

  testimages: Image[] = [
    new Image(
    0, {
      img: 'https://www.dropbox.com/s/hjagfr3h7o4j1tl/56.jpg?raw=1',
        description: 'LUL'
    }
    ),
    new Image(
      1, {
        img: 'https://www.dropbox.com/s/0g8g4zrlz7j0ztm/22.jpg?raw=1',
        description: 'Peter'
      }
    ),
    new Image(
      2, {
        img: 'https://www.dropbox.com/s/a73j817375iixhs/63.jpg?raw=1',
        description: 'Peter'
      }
    ),
    new Image(
      3, {
        img: 'https://www.dropbox.com/s/717e4hp4aedc06u/75.png?raw=1',
        description: 'Peter'
      }
    ),
    new Image(
      4, {
        img: 'https://www.dropbox.com/s/xt91wh9hsvtovi3/69.jpg?raw=1',
        description: 'Peter'
      }
    ),
    new Image(
      5, {
        img: 'https://www.dropbox.com/s/hjagfr3h7o4j1tl/56.jpg?raw=1',
        description: 'LUL'
      }
    ),
    new Image(
      6, {
        img: 'https://www.dropbox.com/s/0g8g4zrlz7j0ztm/22.jpg?raw=1',
        description: 'Peter'
      }
    ),
    new Image(
      7, {
        img: 'https://www.dropbox.com/s/a73j817375iixhs/63.jpg?raw=1',
        description: 'Peter'
      }
    ),
    new Image(
      8, {
        img: 'https://www.dropbox.com/s/717e4hp4aedc06u/75.png?raw=1',
        description: 'Peter'
      }
    ),
    new Image(
      9, {
        img: 'https://www.dropbox.com/s/xt91wh9hsvtovi3/69.jpg?raw=1',
        description: 'Peter'
      },
    ),
  ]


  static images: Array<string>
  imageServer: ImagedisplayService;

  constructor(imageServer: ImagedisplayService, modalGalleryService: GalleryModule) {

    this.loaded = false;
    this.messageLevel = 3;
    this.message = "Bilder werden geladen...."
    this.time = 0;
    this.imageServer = imageServer;
    MainpageComponent.images = new Array<string>();


    imageServer.getImages().then(function (json) {
      for (let i = 0; i < json.length; i++) {
        MainpageComponent.images.push(json[i]);
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

  imageClickEvent($event: MouseEvent,image: any) {

  }
}
