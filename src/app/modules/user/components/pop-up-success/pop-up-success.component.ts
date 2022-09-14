import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pop-up-success',
  templateUrl: './pop-up-success.component.html',
  styleUrls: ['./pop-up-success.component.scss'],
})
export class PopUpSuccessComponent implements OnInit {
  @Input('flagAxeSuccess') flagAxeSuccess: boolean = false;
  @Input('textSuccess') textSuccess: string = '';
  @Output() closePopUpSuccess = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}
  close() {
    this.flagAxeSuccess = false;
    this.closePopUpSuccess.emit(false);
  }
}
