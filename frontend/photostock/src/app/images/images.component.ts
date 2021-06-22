import { Component, OnInit } from '@angular/core';
import {ImagedisplayService} from "../service/imagedisplay.service";
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  messageLevel: number;
  message: string;
  loaded: boolean;

  static images: Array<string>
  imageServer: ImagedisplayService;

  private user;
  private router;

  constructor(imageServer: ImagedisplayService, user: UserService, router: Router) {
    this.loaded = false;
    this.messageLevel = 3;
    this.message = "Bilder werden geladen...."
    this.imageServer = imageServer;

    this.user = user;
    this.router = router;
   }

  ngOnInit(): void {
  
    if(!this.user.isLoggedIn()) {
      this.router.navigate(['/']);
      return;
    }

    ImagesComponent.images = new Array<string>();


    this.imageServer.getImagesByUser(this.user.getUser().name).then(function (json) {
      for (let i = 0; i < json.length; i++) {
        ImagesComponent.images.push(json[i].url);
      }
    }).catch(e => {
        this.messageLevel = 4;
        this.message = "Es ist ein Fehler beim holen der Bilder aufgetreten! " + e;
        return;
    }).then(() => {
      this.loaded = true;
    });
  }

  getImages() {
    return ImagesComponent.images;
  }
}
