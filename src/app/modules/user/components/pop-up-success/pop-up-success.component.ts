import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pop-up-success',
  templateUrl: './pop-up-success.component.html',
  styleUrls: ['./pop-up-success.component.scss'],
})
export class PopUpSuccessComponent implements OnInit {
  @Input('flagAxeSuccess') flagAxeSuccess: boolean = false;
  @Input('textSuccess') textSuccess: string = '';
  constructor() {}

  ngOnInit(): void {}
  close() {
    this.flagAxeSuccess = false;
  }
}
