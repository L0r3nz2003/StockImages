import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent {
  selectedFile: File;
  file_name: string;

  constructor(private router: Router) {
    this.file_name = 'No File selected!';
  }


  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
    this.file_name = this.selectedFile.name;
  }

  onUpload() {


  }
}
