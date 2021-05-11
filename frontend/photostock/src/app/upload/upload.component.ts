import {Component, ElementRef, HostListener, NgModule, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FileService} from "../service/file.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../user.service";
import {ModalComponent} from "../modal/modal.component";

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

  maxTags: number = 10;
  currentTags: number = 0;

  static MAX_IMAGE_SIZE = 10000000;


  @ViewChild('UploadFileInput', {static: false}) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  uploadDisabled: boolean;

  modal_show: boolean;

  showTextField: boolean;
  textBoxSize: number;
  modalErrorText: string;


  constructor(private fileService: FileService, private formBuilder: FormBuilder, private router: Router, public userService: UserService) {
    this.file_name = 'No File selected!';
    this.addText = "<b>+</b>";
    this.uploadDisabled = true;
    this.tags = new Array<string>();
    this.showTextField = false;
    this.textBoxSize = 1;
    this.modal_show = false;
  }

  ngOnInit(): void {
    if(!this.userService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onFileChanged(event, errorModal: ModalComponent) {
    this.fileInputLabel = event.target.files[0];
    //this.fileUploadForm.get('uploadedImage').setValue(event.target.files[0]);
    this.file_name = event.target.files[0].name;
    this.uploadDisabled = false;
  }

  addTag() {

    if (this.inputTag.nativeElement.value.length == 0 || this.tags.indexOf(this.inputTag.nativeElement.value) > 0)
      return;

    this.showTextField = false;
    this.tags.push(this.inputTag.nativeElement.value);
    this.inputTag.nativeElement.value = "";
    this.currentTags++;
    this.textBoxSize = 1;
  }

  onUpload() {

    this.modal_show = true;
    const formData = new FormData();
    //formData.append('uploadedImage', this.fileUploadForm.get('uploadedImage').value);
    // formData.append('agentId', '007');
  }

  removeTag(tag: number) {
    this.tags.splice(tag, 1);
    this.currentTags--;
  }

  resize(value: any) {
    this.textBoxSize = value.length > 8 ? 8 : value.length;
  }

  checkFile(file: File, errorModal: ModalComponent) {
    if(file.size >= 1) {
      this.modalErrorText = "Das Bild überschreitet das Uploadlimit von " + UploadComponent.MAX_IMAGE_SIZE / 1000 + "MB!";
      errorModal.currentHidden = false;
    }
  }

  onFileDrop($event: DragEvent, errorModal: ModalComponent) {
    $event.preventDefault();
    $event.stopPropagation();
    console.log("Moin");

    let file = $event.dataTransfer.files.item(0);
    this.checkFile(file, errorModal);

  }
}
