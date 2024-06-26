import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'modal',
  template: `
    <div [ngClass]="{'modal' : !allowHeaderInteraction, 'modal-without-header' : allowHeaderInteraction}" [hidden]="currentHidden">
      <div [ngClass]="{'modal-content' : true, 'animate' : animation}">
        <div class="container" *ngIf="imageSource.length > 0">
          <img [src]="getImage(messageLevel)" width="128px" height="128px">
        </div>
        <div [ngClass]="{'container' : true, 'message' : message}">
          <ng-content>
          </ng-content>
        </div>
        <button *ngIf="button && type === 'ok'" type="button" (click)="currentHidden = true; closeAction.emit(null)" id="cancelbutton">Okay</button>
        <ng-container *ngIf="type === 'cancel'">
        <div id="buttonGroup">
        <button (click)="acceptAction.emit(null)" id="ok">Ok</button>
        <button (click)="cancelAction.emit(null)" id="cancel">Abbrechen</button>
        </div>
        </ng-container>
      </div>
    </div>
  `,

  styleUrls: ['modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() animation: boolean = true;
  @Input() currentHidden: boolean = true;
  @Input() allowHeaderInteraction: boolean = false;
  @Input() button: boolean = true;
  @Input() message: boolean = false;
  @Input() messageLevel: number = 0;
  @Input() type: string = "ok";
  @Output() closeAction: EventEmitter<any> = new EventEmitter();
  @Output() acceptAction: EventEmitter<any> = new EventEmitter();
  @Output() cancelAction: EventEmitter<any> = new EventEmitter();

  public imageSource: string;

  constructor() {
  }

  //Set the current Icon
  setImageSource(messageLevel: number) {
    this.updateImageSource(messageLevel);
  }

  public getImage(messageLevel: number): string {
    switch (messageLevel) {
      case 1:
        return MessageLevel.CHECK;
        break;
      case 2:
        return MessageLevel.WARNING;
        break;
      case 3:
        return MessageLevel.IN_PROGRESS;
        break;
      case 4:
        return MessageLevel.ERROR;
        break;
      default:
        return MessageLevel.NONE;
    }
  }

  private updateImageSource(messageLevel: number) {
    switch (messageLevel) {
      case 1:
        this.imageSource = MessageLevel.CHECK;
        break;
      case 2:
        this.imageSource = MessageLevel.WARNING;
        break;
      case 3:
        this.imageSource = MessageLevel.IN_PROGRESS;
        break;
      case 4:
        this.imageSource = MessageLevel.ERROR;
        break;
      default:
        this.imageSource = MessageLevel.NONE;
    }
  }

  ngOnInit(): void {
      this.updateImageSource(this.messageLevel);
  }
}
  export enum MessageLevel {
    NONE = '',
    CHECK = 'assets/icons/check.png',
    WARNING = 'assets/icons/warning.gif',
    IN_PROGRESS = 'assets/icons/progress.gif',
    ERROR = 'assets/icons/error.png'
}


