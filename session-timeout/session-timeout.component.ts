import { Component, Input, OnInit, OnDestroy } from "@angular/core";

import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "session-timeout",
  styleUrls: ["./session-timeout.component.scss"],
  templateUrl: "./session-timeout.component.html"
})
export class SessionTimeoutComponent implements OnInit, OnDestroy {
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) {}

  public timeoutDuration: number = 5000;
  public setTimeoutKey: any = undefined;
  public countDownKey:any = undefined;
  public remainingSecondsToAutoTimeout = 60;

  @Input() modalConfig: object = {
    title: "Timeout alert",
    body: "Your session will be time out in next one minute",
    buttons: {
      logout: "Logout",
      continue: "Continue"
    }
  };

  ngOnInit() {
    this.countDownTimer();
  }

  countDownTimer() {
    this.remainingSecondsToAutoTimeout = 60;
    this.countDownKey = setInterval(() => {
      this.remainingSecondsToAutoTimeout = --this.remainingSecondsToAutoTimeout;
      console.log("Modal count down: ",this.remainingSecondsToAutoTimeout);
    }, 1000);
  }

  ngOnDestroy(){
    clearInterval(this.countDownKey);
    console.log("This modal has collapsed");
  }
}
