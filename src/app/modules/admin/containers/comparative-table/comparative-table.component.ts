import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comparative-table',
  templateUrl: './comparative-table.component.html',
  styleUrls: ['./comparative-table.component.scss'],
})
export class ComparativeTableComponent implements OnInit {
  axesList: any[] = [
    {
      id: 1,
      nombre: 'Acompañamiento educativo',
      variablesList: [
        {
          descripcion: '',
          eje: {
            id: 0,
            nombre: 'string',
          },
          escala_valor: 'string',
          etiqueta_final: 'string',
          etiqueta_inicial: 'string',
          genero: 'string',
          id: 0,
          nombre: 'Cantidad de comidas servidas',
          tipo: 'Numérico',
          valor_final: 'string',
          valor_inicial: 'string',
          report1: 4,
          report2: 5,
        },
        {
          descripcion: '',
          eje: {
            id: 0,
            nombre: 'string',
          },
          escala_valor: 'true',
          etiqueta_final: 'Muy Útil',
          etiqueta_inicial: 'Nada Útil',
          genero: 'string',
          id: 0,
          nombre: 'Utilidad de la asesoría nutricional',
          tipo: 'Textual',
          valor_final: '5',
          valor_inicial: '1',
          report1: 5,
          report2: 1,
        },
        {
          descripcion: 'de manera directa e indirecta',
          eje: {
            id: 0,
            nombre: 'string',
          },
          escala_valor: 'false',
          etiqueta_final: 'Muy Útil',
          etiqueta_inicial: 'Nada Útil',
          genero: 'true',
          id: 0,
          nombre: 'Cantidad total de participantes',
          tipo: 'Numérico',
          valor_final: '8',
          valor_inicial: '1',
          report1: 23,
          report2: 27,
        },
        {
          descripcion: '',
          eje: {
            id: 0,
            nombre: 'string',
          },
          escala_valor: 'true',
          etiqueta_final: 'Muy Útil',
          etiqueta_inicial: 'Nada Útil',
          genero: 'string',
          id: 0,
          nombre: 'Calidad de mejoría nutricional',
          tipo: 'Textual',
          valor_final: '6',
          valor_inicial: '1',
          report1: 7,
          report2: 1,
        },
      ],
    },
    {
      id: 2,
      nombre: 'Seguridad nutricional',
      variablesList: [
        {
          descripcion: '',
          eje: {
            id: 0,
            nombre: 'string',
          },
          escala_valor: 'string',
          etiqueta_final: 'string',
          etiqueta_inicial: 'string',
          genero: 'string',
          id: 0,
          nombre: 'Cantidad de comidas servidas',
          tipo: 'Numérico',
          valor_final: 'string',
          valor_inicial: 'string',
          report1: 4,
          report2: 5,
        },
        {
          descripcion: '',
          eje: {
            id: 0,
            nombre: 'string',
          },
          escala_valor: 'true',
          etiqueta_final: 'Muy Útil',
          etiqueta_inicial: 'Nada Útil',
          genero: 'string',
          id: 0,
          nombre: 'Utilidad de la asesoría nutricional',
          tipo: 'Textual',
          valor_final: '7',
          valor_inicial: '1',
          report1: 5,
          report2: 1,
        },
        {
          descripcion: 'de manera directa e indirecta',
          eje: {
            id: 0,
            nombre: 'string',
          },
          escala_valor: 'false',
          etiqueta_final: 'string',
          etiqueta_inicial: 'string',
          genero: 'true',
          id: 0,
          nombre: 'Cantidad total de participantes',
          tipo: 'Numérico',
          valor_final: '8',
          valor_inicial: '1',
          report1: 23,
          report2: 27,
        },
        {
          descripcion: '',
          eje: {
            id: 0,
            nombre: 'string',
          },
          escala_valor: 'true',
          etiqueta_final: 'Muy Útil',
          etiqueta_inicial: 'Nada Útil',
          genero: 'string',
          id: 0,
          nombre: 'Calidad de mejoría nutricional',
          tipo: 'Textual',
          valor_final: '9',
          valor_inicial: '1',
          report1: 7,
          report2: 1,
        },
      ],
    },
  ];
  alphabet: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  biAlphabet: string[] = [];
  constructor() {}

  ngOnInit(): void {
    this.createBiAlphabet();
  }
  //crea un indice de alfabeto doble
  createBiAlphabet() {
    let i;
    this.biAlphabet = [];
    for (i = 0; i < 26; i++) {
      this.biAlphabet.push(this.alphabet[i]);
    }
    i++;
    for (let character1 of this.alphabet) {
      for (let character2 of this.alphabet) {
        if (i < 677) {
          this.biAlphabet.push(character1 + character2);
          i++;
        }
      }
    }
  }
}
