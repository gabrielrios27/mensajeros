import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { variable } from 'src/app/modules/admin/models';

@Component({
  selector: 'app-report-upload',
  templateUrl: './report-upload.component.html',
  styleUrls: ['./report-upload.component.scss'],
})
export class ReportUploadComponent implements OnInit {
  //ejes hardcodeados antes de implementación
  axes: string[] = ['axe1', 'axe2', 'axe3'];
  report: any = [
    {
      axe: 'Acompañamiento Educativo',
      variables: [
        {
          id: 20,
          nombre: 'cant. talleres',
          descripcion: 'desc',
          tipo: 'Textual',
          genero: 'false',
          escala_valor: 'true',
          valor_inicial: '0',
          valor_final: '5',
          etiqueta_inicial: 'aa',
          etiqueta_final: 'zz',
          eje: {
            id: 5,
            nombre: 'Acompañamiento Educativo',
          },
        },
        {
          id: 32,
          nombre: 'Cantidad de participantes en taller1',
          descripcion: 'desc.222',
          tipo: 'Textual',
          genero: 'false',
          escala_valor: 'false',
          valor_inicial: 'null',
          valor_final: 'null',
          etiqueta_inicial: 'null',
          etiqueta_final: 'null',
          eje: {
            id: 5,
            nombre: 'Acompañamiento Educativo',
          },
        },
        {
          id: 37,
          nombre: 'cantidad 2',
          descripcion: 'desc',
          tipo: 'Numérico',
          genero: 'false',
          escala_valor: 'false',
          valor_inicial: 'null',
          valor_final: 'null',
          etiqueta_inicial: 'null',
          etiqueta_final: 'null',
          eje: {
            id: 5,
            nombre: 'Acompañamiento Educativo',
          },
        },
        {
          id: 32,
          nombre: 'Cantidad de participantes en taller3',
          descripcion: 'desc.222444',
          tipo: 'Numérico',
          genero: 'true',
          escala_valor: 'false',
          valor_inicial: 'null',
          valor_final: 'null',
          etiqueta_inicial: 'null',
          etiqueta_final: 'null',
          eje: {
            id: 8,
            nombre: 'Acompañamiento Educativo',
          },
        },
      ],
      complete: false,
    },
    {
      axe: 'Acompañamiento Educativo2',
      variables: [
        {
          id: 20,
          nombre: 'cant. talleres22222',
          descripcion: 'desc',
          tipo: 'Textual',
          genero: 'false',
          escala_valor: 'true',
          valor_inicial: '0',
          valor_final: '5',
          etiqueta_inicial: 'aa',
          etiqueta_final: 'zz',
          eje: {
            id: 5,
            nombre: 'Acompañamiento Educativo2',
          },
        },
        {
          id: 32,
          nombre: 'Cantidad de participantes en taller122222',
          descripcion: 'desc.222',
          tipo: 'Textual',
          genero: 'false',
          escala_valor: 'false',
          valor_inicial: 'null',
          valor_final: 'null',
          etiqueta_inicial: 'null',
          etiqueta_final: 'null',
          eje: {
            id: 5,
            nombre: 'Acompañamiento Educativo2',
          },
        },
        {
          id: 37,
          nombre: 'cantidad 2222222',
          descripcion: 'desc',
          tipo: 'Numérico',
          genero: 'false',
          escala_valor: 'false',
          valor_inicial: 'null',
          valor_final: 'null',
          etiqueta_inicial: 'null',
          etiqueta_final: 'null',
          eje: {
            id: 5,
            nombre: 'Acompañamiento Educativo2',
          },
        },
        {
          id: 32,
          nombre: 'Cantidad de participantes en taller3222222',
          descripcion: 'desc.222444',
          tipo: 'Numérico',
          genero: 'true',
          escala_valor: 'false',
          valor_inicial: 'null',
          valor_final: 'null',
          etiqueta_inicial: 'null',
          etiqueta_final: 'null',
          eje: {
            id: 8,
            nombre: 'Acompañamiento Educativo2',
          },
        },
      ],
      complete: false,
    },
    {
      axe: 'Acompañamiento Educativo3',
      variables: [
        {
          id: 20,
          nombre: 'cant. talleres33333',
          descripcion: 'desc',
          tipo: 'Textual',
          genero: 'false',
          escala_valor: 'true',
          valor_inicial: '0',
          valor_final: '5',
          etiqueta_inicial: 'aa',
          etiqueta_final: 'zz',
          eje: {
            id: 5,
            nombre: 'Acompañamiento Educativo3',
          },
        },
        {
          id: 32,
          nombre: 'Cantidad de participantes en taller1333333',
          descripcion: 'desc.222',
          tipo: 'Textual',
          genero: 'false',
          escala_valor: 'false',
          valor_inicial: 'null',
          valor_final: 'null',
          etiqueta_inicial: 'null',
          etiqueta_final: 'null',
          eje: {
            id: 5,
            nombre: 'Acompañamiento Educativo3',
          },
        },
        {
          id: 37,
          nombre: 'cantidad 233333',
          descripcion: 'desc',
          tipo: 'Numérico',
          genero: 'false',
          escala_valor: 'false',
          valor_inicial: 'null',
          valor_final: 'null',
          etiqueta_inicial: 'null',
          etiqueta_final: 'null',
          eje: {
            id: 5,
            nombre: 'Acompañamiento Educativo3',
          },
        },
        {
          id: 32,
          nombre: 'Cantidad de participantes en taller333333',
          descripcion: 'desc.222444',
          tipo: 'Numérico',
          genero: 'true',
          escala_valor: 'false',
          valor_inicial: 'null',
          valor_final: 'null',
          etiqueta_inicial: 'null',
          etiqueta_final: 'null',
          eje: {
            id: 8,
            nombre: 'Acompañamiento Educativo3',
          },
        },
      ],
      complete: false,
    },
  ];

  @Output() reportToUpload = new EventEmitter<any>();
  @Input('idReport') idReport: number = 0;
  axeToUpload: any;
  variableToUpload: variable[] = {} as variable[];

  constructor() {}

  ngOnInit(): void {
    this.axeToShow();
  }
  axeToShow() {
    for (let item of this.report) {
      if (!item.complete) {
        this.axeToUpload = item.axe;
        this.variableToUpload = item.variables;
      }
    }
  }
}
