import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'modal',
  template: `
    <div [ngClass]="{'modal' : !allowHeaderInteraction, 'modal-without-header' : allowHeaderInteraction}" [hidden]="currentHidden">
      <div [ngClass]="{'modal-content' : true, 'animate' : animation}">
        <div class="container" *ngIf="imageSource.length > 0">
          <img [src]="imageSource" width="128px" height="128px">
        </div>
        <div [ngClass]="{'container' : true, 'message' : message}">
          <ng-content>
          </ng-content>
        </div>
        <button *ngIf="button" type="button" (click)="currentHidden = true; closeAction.emit(null)" id="cancelbutton">Okay</button>
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
  @Output() closeAction: EventEmitter<any> = new EventEmitter();


  public imageSource: string;

  constructor() {
  }

  ngOnInit(): void {

    switch (this.messageLevel) {
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
}
  export enum MessageLevel {
    NONE = '',
    CHECK = 'assets/icons/check.png',
    WARNING = 'assets/icons/warning.gif',
    IN_PROGRESS = 'assets/icons/progress.gif',
    ERROR = 'assets/icons/error.png'
}


