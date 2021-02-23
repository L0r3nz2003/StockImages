import {Component, ElementRef, NgModule, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {FileService} from "../file.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent {

  @ViewChild('inputTag') inputTag: ElementRef;

  tags: Array<string>;
  selectedFile: File;
  file_name: string;
  addText: string;

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  uploadDisabled: boolean;
  showTextField: boolean;


  constructor(private fileService: FileService,  private formBuilder: FormBuilder) {
    this.file_name = 'No File selected!';
    this.addText = "<b>+</b>";
    this.uploadDisabled = true;
    this.tags = new Array<string>();
    this.showTextField = false;
  }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: ['']
    });
  }


  onFileChanged(event) {
    this.fileInputLabel = event.target.files[0];
    this.fileUploadForm.get('uploadedImage').setValue(event.target.files[0]);
    this.file_name = event.target.files[0].name;
    this.uploadDisabled = false;
  }

  addTag() {
    this.showTextField = false;
    this.tags.push(this.inputTag.nativeElement.value);
  }

  onUpload() {

    const formData = new FormData();
    formData.append('uploadedImage', this.fileUploadForm.get('uploadedImage').value);
    formData.append('agentId', '007');

    document.getElementById('id01').style.display="block";
  }
}
