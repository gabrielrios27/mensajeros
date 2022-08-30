import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pop-up-delete-report',
  templateUrl: './pop-up-delete-report.component.html',
  styleUrls: ['./pop-up-delete-report.component.scss'],
})
export class PopUpDeleteReportComponent implements OnInit {
  @Output() goOut = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}
  logout() {}
  //al dar click en salir (X)
  onGoOut(value: boolean) {
    this.goOut.emit(value);
  }
}
