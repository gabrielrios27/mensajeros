import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { isTemplateExpression } from 'typescript';
import {
  AxeWithVariables,
  BodyComparativeReport,
  ComparativeReports,
  variable,
} from '../../models';
import { AdminService } from '../../services';

@Component({
  selector: 'app-comparative-table',
  templateUrl: './comparative-table.component.html',
  styleUrls: ['./comparative-table.component.scss'],
})
export class ComparativeTableComponent implements OnInit, OnDestroy {
  // axesList: any[] = [
  //   {
  //     id: 1,
  //     nombre: 'Acompañamiento educativo',
  //     variablesList: [
  //       {
  //         descripcion: '',
  //         eje: {
  //           id: 0,
  //           nombre: 'string',
  //         },
  //         escala_valor: 'string',
  //         etiqueta_final: 'string',
  //         etiqueta_inicial: 'string',
  //         genero: 'string',
  //         id: 0,
  //         nombre: 'Cantidad de comidas servidas',
  //         tipo: 'Numérico',
  //         valor_final: 'string',
  //         valor_inicial: 'string',
  //         report1: 4,
  //         report2: 5,
  //       },
  //       {
  //         descripcion: '',
  //         eje: {
  //           id: 0,
  //           nombre: 'string',
  //         },
  //         escala_valor: 'true',
  //         etiqueta_final: 'Muy Útil',
  //         etiqueta_inicial: 'Nada Útil',
  //         genero: 'string',
  //         id: 0,
  //         nombre: 'Utilidad de la asesoría nutricional',
  //         tipo: 'Textual',
  //         valor_final: '5',
  //         valor_inicial: '1',
  //         report1: 5,
  //         report2: 1,
  //       },
  //       {
  //         descripcion: 'de manera directa e indirecta',
  //         eje: {
  //           id: 0,
  //           nombre: 'string',
  //         },
  //         escala_valor: 'false',
  //         etiqueta_final: 'Muy Útil',
  //         etiqueta_inicial: 'Nada Útil',
  //         genero: 'true',
  //         id: 0,
  //         nombre: 'Cantidad total de participantes',
  //         tipo: 'Numérico',
  //         valor_final: '8',
  //         valor_inicial: '1',
  //         report1: 23,
  //         report2: 27,
  //       },
  //       {
  //         descripcion: '',
  //         eje: {
  //           id: 0,
  //           nombre: 'string',
  //         },
  //         escala_valor: 'true',
  //         etiqueta_final: 'Muy Útil',
  //         etiqueta_inicial: 'Nada Útil',
  //         genero: 'string',
  //         id: 0,
  //         nombre: 'Calidad de mejoría nutricional',
  //         tipo: 'Textual',
  //         valor_final: '6',
  //         valor_inicial: '1',
  //         report1: 7,
  //         report2: 1,
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     nombre: 'Seguridad nutricional',
  //     variablesList: [
  //       {
  //         descripcion: '',
  //         eje: {
  //           id: 0,
  //           nombre: 'string',
  //         },
  //         escala_valor: 'string',
  //         etiqueta_final: 'string',
  //         etiqueta_inicial: 'string',
  //         genero: 'string',
  //         id: 0,
  //         nombre: 'Cantidad de comidas servidas',
  //         tipo: 'Numérico',
  //         valor_final: 'string',
  //         valor_inicial: 'string',
  //         report1: 4,
  //         report2: 5,
  //       },
  //       {
  //         descripcion: '',
  //         eje: {
  //           id: 0,
  //           nombre: 'string',
  //         },
  //         escala_valor: 'true',
  //         etiqueta_final: 'Muy Útil',
  //         etiqueta_inicial: 'Nada Útil',
  //         genero: 'string',
  //         id: 0,
  //         nombre: 'Utilidad de la asesoría nutricional',
  //         tipo: 'Textual',
  //         valor_final: '7',
  //         valor_inicial: '1',
  //         report1: 5,
  //         report2: 1,
  //       },
  //       {
  //         descripcion: 'de manera directa e indirecta',
  //         eje: {
  //           id: 0,
  //           nombre: 'string',
  //         },
  //         escala_valor: 'false',
  //         etiqueta_final: 'string',
  //         etiqueta_inicial: 'string',
  //         genero: 'true',
  //         id: 0,
  //         nombre: 'Cantidad total de participantes',
  //         tipo: 'Numérico',
  //         valor_final: '8',
  //         valor_inicial: '1',
  //         report1: 23,
  //         report2: 27,
  //       },
  //       {
  //         descripcion: '',
  //         eje: {
  //           id: 0,
  //           nombre: 'string',
  //         },
  //         escala_valor: 'true',
  //         etiqueta_final: 'Muy Útil',
  //         etiqueta_inicial: 'Nada Útil',
  //         genero: 'string',
  //         id: 0,
  //         nombre: 'Calidad de mejoría nutricional',
  //         tipo: 'Textual',
  //         valor_final: '9',
  //         valor_inicial: '1',
  //         report1: 7,
  //         report2: 1,
  //       },
  //     ],
  //   },
  // ];
  axesList: AxeWithVariables[];
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
  idCentro: number;
  bodyComparativeReport: BodyComparativeReport;
  comparativeReports: ComparativeReports;
  //suscripciones
  onDestroy$: Subject<boolean> = new Subject();
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private _adminSvc: AdminService
  ) {
    this.idCentro = 0;
    this.bodyComparativeReport = {} as BodyComparativeReport;
    this.comparativeReports = {} as ComparativeReports;
    this.axesList = [];
  }

  ngOnInit(): void {
    this.idCentro = this.getIdFromRute();
    this.getBodySessionStg();
    this.createBiAlphabet();
  }
  getIdFromRute(): number {
    let idToShow;
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      idToShow = params.get('id-centro');
    });
    return Number(idToShow);
  }
  getBodySessionStg() {
    let bodyStr = sessionStorage.getItem('bodyComparativeReport');
    if (bodyStr) {
      this.bodyComparativeReport = JSON.parse(bodyStr);
      this.getComparativeReport();
    }
  }
  getComparativeReport() {
    this._adminSvc
      .createPreviewComparativeReport(this.bodyComparativeReport)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: ComparativeReports) => {
          this.comparativeReports = data;
          this.setResponseReports(this.comparativeReports);
        },
      });
  }
  setResponseReports(report: ComparativeReports) {
    report.carga1.variables.map((variable) => {
      variable.report1 = report.carga1.respuestas.find(
        (resp) => resp.idVariable === variable.id
      );
      variable.report2 = report.carga2.respuestas.find(
        (resp) => resp.idVariable === variable.id
      );
    });
    this.createAxesList(report.carga1.variables);
  }
  createAxesList(variables: variable[]) {
    for (let variableItem of variables) {
      if (
        this.axesList.length === 0 ||
        this.axesList.find(
          (item: AxeWithVariables) => item.id === variableItem.eje.id
        ) === undefined
      ) {
        let newAxe: AxeWithVariables = {
          id: variableItem.eje.id,
          nombre: variableItem.eje.nombre,
          variablesList: variables.filter(
            (item: variable) => item.eje.id === variableItem.eje.id
          ),
        };
        this.axesList.push(newAxe);
      }
    }
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
  onGoBack() {
    this.router.navigate([
      'admin/dashboard/centros/crear-informe-comparativo/' + this.idCentro,
    ]);
  }
  onCreateReport() {
    this.router.navigate(['admin/dashboard/centros']);
  }
  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
}
