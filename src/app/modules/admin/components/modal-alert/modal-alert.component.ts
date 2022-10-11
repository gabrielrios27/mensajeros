import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss'],
})
export class ModalAlertComponent implements OnInit {
  //este flag abre o cierra el modal
  @Input('flag') flag: boolean;
  //Tipo de modal: success / warning / alert / error
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
