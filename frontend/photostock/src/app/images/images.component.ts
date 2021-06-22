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

  performDelete: boolean = false;

  static images: Array<string>
  static imagePos: Array<number>

  imageServer: ImagedisplayService;
  type: string = "cancel";
  public modalMessage: string = "Möchtest du das Bild wirklich löschen?";

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
    ImagesComponent.imagePos = new Array<number>();


    this.imageServer.getImagesByUser(this.user.getUser().name).then(function (json) {
      for (let i = 0; i < json.length; i++) {

        ImagesComponent.imagePos.push(Number.parseInt(json[i].id));
        ImagesComponent.images.push(json[i].url);
      }
    }).catch(e => {
        console.log(e);
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

  selectedImage: {url: string, id: number, index: number};
  

  deleteImage(img: string) {

    var cindex;
    var curl;
    var cid;

    for(var i = 0; i < ImagesComponent.images.length; i++) {
      if(ImagesComponent.images[i] === img) {
      cid = ImagesComponent.imagePos[i];
      cindex = i;
      }
      curl = img;
    }
  


    this.selectedImage = {
      url: curl,
      id: cid,
      index: cindex
    }


    this.performDelete = true;
  }

  performDeleteImage() {
    this.imageServer.deleteImage(this.selectedImage.id).then(data => {
      this.performDelete = false;
      data => {
        this.router.navigate(['/']);
      }
      error => {
        this.router.navigate(['/']);
      }
    });
    ImagesComponent.images.slice(this.selectedImage.index, 1);
  }

  cancelDelete() {
    this.performDelete = false;
  }
}
