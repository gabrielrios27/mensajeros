import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NavbarComponent } from 'src/app/core/layouts/components';

@Component({
  selector: 'app-confirm-out-modal',
  templateUrl: './confirm-out-modal.component.html',
  styleUrls: ['./confirm-out-modal.component.scss'],
})
export class ConfirmOutModalComponent implements OnInit {
  constructor() {}
  @Input('show') display: boolean = false;
  @Output('selection') selection = new EventEmitter();
  ngOnInit(): void {}
  selected(value: string) {
    this.selection.emit(value);
    this.display = false;
  }
}
