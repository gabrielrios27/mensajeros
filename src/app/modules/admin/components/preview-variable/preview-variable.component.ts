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
  //para variable number-distinción de genero
  female: number | null;
  male: number | null;
  noBinary: number | null;
  total: number | null;
  //para variable number
  inputNumber: number | null;
  //para variable textual
  inputTextual: number | null;
  //para escala de valor
  valueScaleSelected: number | null;
  valueScale: number[];
  finalValue: number;
  constructor() {
    this.female = null;
    this.male = null;
    this.noBinary = null;
    this.total = null;
    this.inputNumber = null;
    this.inputTextual = null;
    this.valueScaleSelected = null;
    this.valueScale = [];
    this.finalValue = 0;
  }

  ngOnInit(): void {
    this.checkAxeNull();
    this.createValueScale();
    this.finalValue = Number(this.variableValue.valor_final);
  }
  //si el valor de eje es null se agrega un eje por defecto, para que no se produzcan errores por valor null.
  checkAxeNull() {
    if (!this.variableValue.eje) {
      this.variableValue.eje = {
        id: 0,
        nombre: 'Eje seleccionado',
      };
    }
  }
  //al dar click en salir (X)
  onGoOutPreview(value: boolean) {
    this.goOutPreview.emit(value);
  }
  //para variable number-distinción de genero
  //con este metodo suma el valor total, pero si el input no fue completado no lo suma y deja que se vea el placeholder
  onChangeInput() {
    this.total = 0;
    if (this.female) {
      if (this.female < 0) {
        this.female = 1;
      }
      this.total += this.female;
    }
    if (this.male) {
      if (this.male < 0) {
        this.male = 1;
      }
      this.total += this.male;
    }
    if (this.noBinary) {
      if (this.noBinary < 0) {
        this.noBinary = 1;
      }
      this.total += this.noBinary;
    }
  }
  //para variable number
  //si el valor ingresado es negativo entonces cambia a 1
  checkValue() {
    if (this.inputNumber) {
      if (this.inputNumber < 0) {
        this.inputNumber = 1;
      }
    }
  }
  //para variable escala de valor
  //crea array con numeros de la escala elegida para renderizarla como checkbox
  createValueScale() {
    for (
      let i = Number(this.variableValue.valor_inicial);
      i <= Number(this.variableValue.valor_final);
      i++
    ) {
      this.valueScale.push(i);
    }
  }
}
