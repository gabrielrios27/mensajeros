import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { variable } from 'src/app/modules/admin/models';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../services';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-report-upload',
  templateUrl: './report-upload.component.html',
  styleUrls: ['./report-upload.component.scss'],
})
export class ReportUploadComponent implements OnInit {
  //ejes hardcodeados antes de implementación
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
  report: any = [
    {
      axe: 'Acompañamiento Educativo',
      variables: [
        {
          id: 21,
          nombre: 'Cantidad de participantes en talleres',
          descripcion: 'Taller 1 y talller 2',
          tipo: 'Numérico',
          genero: 'true',
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
      ],
      complete: false,
    },
    {
      axe: 'SEGURIDAD NUTRICIONAL',
      variables: [
        {
          id: 54,
          nombre: 'Cantidad de comidas dadas anualmente por persona',
          descripcion: 'desayuno, merienda, almuerzo, cena',
          tipo: 'Numérico',
          genero: 'false',
          escala_valor: 'false',
          valor_inicial: 'null',
          valor_final: 'null',
          etiqueta_inicial: 'null',
          etiqueta_final: 'null',
          eje: {
            id: 8,
            nombre: 'SEGURIDAD NUTRICIONAL',
          },
        },
        {
          id: 54,
          nombre: 'Cantidad de participantes',
          descripcion: 'En todos los comedores',
          tipo: 'Numérico',
          genero: 'true',
          escala_valor: 'false',
          valor_inicial: 'null',
          valor_final: 'null',
          etiqueta_inicial: 'null',
          etiqueta_final: 'null',
          eje: {
            id: 8,
            nombre: 'SEGURIDAD NUTRICIONAL',
          },
        },
      ],
      complete: false,
    },
    {
      axe: 'ACOMPAÑAMIENTO EN SALUD',
      variables: [
        {
          id: 71,
          nombre: 'Calidad de la intervención en salud',
          descripcion: '',
          tipo: 'Textual',
          genero: 'false',
          escala_valor: 'true',
          valor_inicial: '1',
          valor_final: '5',
          etiqueta_inicial: 'MUY MALO',
          etiqueta_final: 'EXCELENTE',
          eje: {
            id: 5,
            nombre: 'ACOMPAÑAMIENTO EN SALUD',
          },
        },
        {
          id: 72,
          nombre: 'Descripcion de eventos realizados',
          descripcion: 'En las diferentes localidades',
          tipo: 'Textual',
          genero: 'false',
          escala_valor: 'false',
          valor_inicial: 'null',
          valor_final: 'null',
          etiqueta_inicial: 'null',
          etiqueta_final: 'null',
          eje: {
            id: 5,
            nombre: 'ACOMPAÑAMIENTO EN SALUD',
          },
        },
        {
          id: 73,
          nombre: 'Cantidad de acompañamientos/intervenciones',
          descripcion: 'vacunas, ESI, anticoncepción, atención directa',
          tipo: 'Numérico',
          genero: 'false',
          escala_valor: 'false',
          valor_inicial: 'null',
          valor_final: 'null',
          etiqueta_inicial: 'null',
          etiqueta_final: 'null',
          eje: {
            id: 5,
            nombre: 'ACOMPAÑAMIENTO EN SALUD',
          },
        },
      ],
      complete: false,
    },
  ];

  @Output() reportToUpload = new EventEmitter<any>();
  @Output() flagBtnGoBack = new EventEmitter<boolean>();
  @Output() flagLastAxeEmit = new EventEmitter<boolean>();
  @Input('idReport') idReport: number = 0;
  @Input('flagLastAxe') flagLastAxe: boolean = false;
  //para recibir click en el btn guardar y salir del comp. upload report
  clickSaveExitSubscription: Subscription;
  nameReport: string = 'C00010';
  axeToUpload: any;
  variablesReport: variable[] = {} as variable[];
  variablesToUpload: any[] = [];
  reportComplete: any[] = [];
  reportPartial: any[] = [];
  flagNoVariable: boolean = false;
  indexOfVariables: number = 0;
  indexOfAxe: number = 0;

  constructor(
    private router: Router,
    private userSvc: UserService,
    private viewportScr: ViewportScroller
  ) {
    this.clickSaveExitSubscription = this.userSvc
      .getClickSaveExit()
      .subscribe(() => {
        this.onSaveExit();
      });
  }

  ngOnInit(): void {
    this.axeToShow();
    this.createBiAlphabet();
  }
  axeToShow() {
    this.indexOfAxe = 0;
    for (let item of this.report) {
      this.indexOfAxe++;
      if (!item.complete) {
        this.axeToUpload = item.axe;
        this.variablesReport = item.variables;
        if (this.axeToUpload === this.report[0].axe) {
          this.flagBtnGoBack.emit(false);
          console.log('btn back false');
        } else {
          this.flagBtnGoBack.emit(true);
          console.log('btn back true');
        }

        break;
      }
    }
  }
  confirmCompleteAxe() {
    this.viewportScr.scrollToPosition([0, 0]);
    let i = 0;
    for (let item of this.report) {
      i++;
      if (item.axe === this.axeToUpload) {
        item.complete = true;
        break;
      }
    }
    if (i === this.report.length) {
      this.flagLastAxe = true;
      this.flagLastAxeEmit.next(this.flagLastAxe);
    }
  }
  getVariablesToUpload($event: any) {
    this.variablesToUpload.push($event);
    this.flagNoVariable = false;
    if (this.variablesToUpload.length === this.variablesReport.length) {
      for (let item of this.variablesToUpload) {
        if (item === undefined) {
          this.flagNoVariable = true;
        }
      }
      if (this.flagNoVariable) {
        this.variablesToUpload = [];
      } else {
        this.reportComplete.push(...this.variablesToUpload);
        this.variablesToUpload = [];
        this.confirmCompleteAxe();
        if (!this.flagLastAxe) {
          this.axeToShow();
        }
        console.log('el reporte completo es: ', this.reportComplete);
      }
    }
  }
  getVariablesToSaveExit($event: any) {
    this.variablesToUpload.push($event);
    console.log(this.variablesToUpload);

    if (this.variablesToUpload.length === this.variablesReport.length) {
      for (let item of this.variablesToUpload) {
        if (item) {
          this.reportPartial.push(item); // variables a guardar cuando se implemente endpoint de editar reporte
        }
      }
      this.router.navigate(['/user/dashboard/mis-reportes/pendientes']);
    }
  }
  getVariablesToSaveGoBack($event: any) {
    this.indexOfVariables++;
    if (this.indexOfVariables === this.variablesReport.length) {
      let i = 0;
      for (let item of this.report) {
        console.log('ir atras i: ', i);
        console.log('nombre eje en rep: ', item.axe);
        console.log('nombre eje actual: ', this.axeToUpload);
        if (item.axe === this.axeToUpload && i > 0) {
          this.report[i - 1].complete = false;
          break;
        }
        i++;
      }
      this.axeToShow();
    }
  }
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
  onSaveExit() {
    if (this.flagLastAxe) {
      this.router.navigate(['/user/dashboard/mis-reportes/pendientes']);
    }
  }
}
