import {Component, ElementRef, HostListener, NgModule, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FileService} from "../service/file.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from "../service/user.service";
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

  file: File;
  uploadDisabled: boolean;

  modal_show: boolean;

  showTextField: boolean;
  textBoxSize: number;
  modalErrorText: string;
  uploadForm: FormGroup;


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
    } else {
      this.uploadForm = this.formBuilder.group({
        profile: ['']
      });
    }

  }

  onFileChanged(files: FileList) {
    this.file = files.item(0);
    this.file_name = files.item(0).name;
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

  openSettings() {
    this.modal_show = true;
  }

  async onUpload(uploadModal: ModalComponent, desc: HTMLTextAreaElement, errorModal: ModalComponent) {
    //upload image
    uploadModal.currentHidden = false;
    this.modal_show = true;
    this.uploadForm.get('profile').setValue(this.file);
    let tags = "";

    if(desc.value.length == 0) {
      return;
    }

    for(const tag of this.tags) {
        tags += tag + ";";
    }

    if(tags.length == 0) {
      return;
    }

    tags = tags.substr(0, tags.length -1);

     this.fileService.upload(this.uploadForm, desc.value, tags, this.userService.getUser()).subscribe(data => {

      uploadModal.currentHidden = true;
     }, error => {
       if(error.error.error === "Duplicates are not allowed") {
      this.modalErrorText = "Leider sieht es so aus, als würde dein Bild bereits hochgeladen worden sein!"
      uploadModal.currentHidden = true;
      errorModal.currentHidden = false;
       }
     })

    uploadModal.currentHidden = true;
    uploadModal.setImageSource(1);
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

  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
