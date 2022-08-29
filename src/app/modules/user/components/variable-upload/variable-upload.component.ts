import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { variable } from 'src/app/modules/admin/models';
import { UserService } from '../../services';

@Component({
  selector: 'app-variable-upload',
  templateUrl: './variable-upload.component.html',
  styleUrls: ['./variable-upload.component.scss'],
})
export class VariableUploadComponent implements OnInit {
  @Input('variableValue') variableValue: variable = {} as variable;
  @Input('indexAlphabet') indexAlphabet: string;
  @Output() variableToUpload = new EventEmitter<any>();
  variableComplete: any;
  //para recibir click en el btn confirmar eje del comp. upload report
  clickEventSubscription: Subscription;
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
  //observaciones
  inputObservations: string = '';
  //para modal flagAlert
  flagAlert: boolean = false;
  flagAlertValueEscale: boolean = false;
  constructor(private userSvc: UserService, private fb: FormBuilder) {
    this.clickEventSubscription = this.userSvc.getClickEvent().subscribe(() => {
      this.onConfirmAxe();
    });
    this.indexAlphabet = 'A';
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

  //para variable number-distinción de genero
  //con este metodo suma el valor total, pero si el input no fue completado no lo suma y deja que se vea el placeholder
  onChangeInput() {
    this.total = 0;
    this.flagAlert = false;
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
    if (this.total === 0) {
      this.total = null;
      this.female = null;
      this.male = null;
      this.noBinary = null;
    }
  }
  //para variable number
  //si el valor ingresado es negativo entonces cambia a 1
  checkValue() {
    this.flagAlert = false;
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
  //Crea la variable a enviar a componente report-upload - flag de alerta si no se completaron los campos
  createVariableToUpload() {
    this.variableComplete = undefined;
    if (this.variableValue.genero === 'true') {
      if (this.total === null) {
        this.flagAlert = true;
      } else {
        this.variableComplete = {
          id: this.variableValue.id,
          name: this.variableValue.nombre,
          description: this.variableValue.descripcion,
          axe: this.variableValue.eje.nombre,
          female: this.female,
          male: this.male,
          noBinary: this.noBinary,
          total: this.total,
          observations: this.inputObservations,
        };
      }
    }
    if (
      this.variableValue.tipo === 'Numérico' &&
      this.variableValue.genero === 'false'
    ) {
      if (!this.inputNumber) {
        this.flagAlert = true;
      } else {
        this.variableComplete = {
          id: this.variableValue.id,
          name: this.variableValue.nombre,
          description: this.variableValue.descripcion,
          axe: this.variableValue.eje.nombre,
          inputNumber: this.inputNumber,
          observations: this.inputObservations,
        };
      }
    }
    if (this.variableValue.tipo === 'Textual') {
      if (!this.inputTextual) {
        this.flagAlert = true;
      } else if (this.variableValue.escala_valor === 'false') {
        this.variableComplete = {
          id: this.variableValue.id,
          name: this.variableValue.nombre,
          description: this.variableValue.descripcion,
          axe: this.variableValue.eje.nombre,
          inputTextual: this.inputTextual,
          observations: this.inputObservations,
        };
      }

      if (this.variableValue.escala_valor === 'true') {
        if (this.valueScaleSelected === null) {
          this.flagAlertValueEscale = true;
        } else {
          if (this.flagAlert) {
            this.variableComplete = undefined;
          } else {
            this.variableComplete = {
              id: this.variableValue.id,
              name: this.variableValue.nombre,
              description: this.variableValue.descripcion,
              axe: this.variableValue.eje.nombre,
              inputTextual: this.inputTextual,
              valueScaleSelected: this.valueScaleSelected,
              observations: this.inputObservations,
            };
          }
        }
      }
    }
  }
  onChangeValue(e: string) {
    if (e.length !== 0) {
      this.flagAlert = false;
    }
  }
  checkScaleValue() {
    if (this.valueScaleSelected !== null) {
      this.flagAlertValueEscale = false;
    }
  }
  //al dar click en confirmar eje en upload report
  onConfirmAxe() {
    this.createVariableToUpload();
    this.variableToUpload.emit(this.variableComplete);
  }
}
