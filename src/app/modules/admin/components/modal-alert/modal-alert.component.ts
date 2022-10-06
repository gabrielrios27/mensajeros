import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss'],
})
export class ModalAlertComponent implements OnInit {
  @Input('flag') flag: boolean;
  @Input('type') type: string = 'success';
  @Input('modalText') modalText: string = '';
  @Output() closeModal = new EventEmitter<boolean>();
  @Output('selection') selection = new EventEmitter();
  constructor() {
    this.flag = false;
  }

  ngOnInit(): void {}
  selected(value: string) {
    this.selection.emit(value);
    this.flag = false;
  }
  close() {
    this.closeModal.emit(false);
    this.flag = false;
  }
}
