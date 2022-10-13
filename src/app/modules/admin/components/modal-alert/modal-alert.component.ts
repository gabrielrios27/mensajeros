import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { url } from 'inspector';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss'],
})
export class ModalAlertComponent implements OnInit {
  //este flag abre o cierra el modal
  @Input('flag') flag: boolean;
  //Tipo de modal: success / warning / error / alert
  @Input('type') type: string = 'success';
  @Input('modalText') modalText: string = ''; //texto a mostrar
  @Output() closeModal = new EventEmitter<boolean>();
  @Output('selection') selection = new EventEmitter(); //Para modal warning - envía selección al componente padre
  imgUrl: string = '';
  icoCloseX: string = '';
  constructor() {
    this.flag = false;
  }

  ngOnInit(): void {
    if (this.type === 'success' || this.type === 'alert') {
      this.imgUrl = '../../../../../assets/icons/Check.svg';
      this.icoCloseX = '../../../../../assets/icons/X.svg';
    } else if (this.type === 'warning') {
      this.imgUrl = '../../../../../assets/icons/Exclamation-triangle.svg';
    } else if (this.type === 'error') {
      this.imgUrl = '../../../../../assets/icons/Slash circle.svg';
      this.icoCloseX = '../../../../../assets/icons/X  red.svg';
    }
  }
  selected(value: string) {
    this.selection.emit(value);
    this.flag = false;
  }
  close(type: string) {
    if (type !== 'warning') {
      this.closeModal.emit(false);
      this.flag = false;
    }
  }
  closeX(type: string) {
    if (type === 'warning') {
      this.closeModal.emit(false);
      this.flag = false;
    }
  }
}
