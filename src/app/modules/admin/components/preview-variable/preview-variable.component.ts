import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { variable } from '../../models';

@Component({
  selector: 'app-preview-variable',
  templateUrl: './preview-variable.component.html',
  styleUrls: ['./preview-variable.component.scss'],
})
export class PreviewVariableComponent implements OnInit {
  @Input('variableValue') variableValue: variable = {} as variable;
  @Output() goOutPreview = new EventEmitter<boolean>();
  female: number | null;
  male: number | null;
  noBinary: number | null;
  total: number | null;
  constructor() {
    this.female = null;
    this.male = null;
    this.noBinary = null;
    this.total = null;
  }

  ngOnInit(): void {
    console.log(this.variableValue);
  }
  onGoOutPreview(value: boolean) {
    console.log(value);
    this.goOutPreview.emit(value);
  }
  onChangeInput() {
    this.total = 0;
    if (!this.female) {
      this.female = 0;
    }
    if (!this.male) {
      this.male = 0;
    }
    if (!this.noBinary) {
      this.noBinary = 0;
    }
    this.total = this.female + this.male + this.noBinary;
  }
}
