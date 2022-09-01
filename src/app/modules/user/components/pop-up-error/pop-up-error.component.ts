import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pop-up-error',
  templateUrl: './pop-up-error.component.html',
  styleUrls: ['./pop-up-error.component.scss'],
})
export class PopUpErrorComponent implements OnInit {
  @Input('flagAxeError') flagAxeError: boolean = false;
  @Input('textError1') textError1: string = '';
  @Input('textError2') textError2: string = '';
  @Output() goOut = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}
  close() {
    this.flagAxeError = false;
    this.goOut.emit(this.flagAxeError);
  }
}
