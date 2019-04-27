import { Directive, ElementRef, HostListener, OnInit } from "@angular/core";

import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { SessionTimeoutComponent } from "./session-timeout.component";

import { NavigateToLogout } from './../../store/actions/page-navigation.action';

import { Store } from '@ngrx/store';

// Constants
const TIME_OUT_DURATION = 5000;
const REMAINING_SECOND_TO_AUTO_TIMEOUT = 60;
const LOGOUT = 'logout';
const CONTINUE = 'continue';

@Directive({
  selector: "[track-dom-event]",
  providers: [NgbActiveModal]
})
export class DomEventDirective implements OnInit {
  constructor(
    private element: ElementRef,
    private modalService: NgbModal,
    private store: Store<any>
  ) {}

  public timeoutDuration: number = TIME_OUT_DURATION;
  public setTimeoutKey: any = undefined;
  public remainingSecondsToAutoTimeout = REMAINING_SECOND_TO_AUTO_TIMEOUT;
  public modalRef:any;

  @HostListener("click", ["$event"])
  onMouseClick() {
    this.timeoutDuration = TIME_OUT_DURATION;
    
    if (this.setTimeoutKey !== undefined) {
      clearTimeout(this.setTimeoutKey);
    }
    
    if (this.modalService.hasOpenModals) {
      this.modalService.dismissAll();
    }
    this.showTimeOutPopup();
   
  }

  ngOnInit() {
    /**
     * Show timeout pop up once page is loaded and user is inactive since page loaded for 30 minutes
     */
    this.showTimeOutPopup();
  }

  showTimeOutPopup() {
    this.setTimeoutKey = setTimeout(() => {
      this.modalRef = this.modalService.open(SessionTimeoutComponent);   
      
      this.modalRef.result.then(
        result => {
          if (result === LOGOUT) {
            this.onMouseClick();
            this.store.dispatch(new NavigateToLogout(''));
          } else if (result === CONTINUE) {
            this.onMouseClick();
          }
        },
        reason => {
        }
      );
     }, this.timeoutDuration);

     
  }


}