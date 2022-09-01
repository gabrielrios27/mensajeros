import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { variable } from 'src/app/modules/admin/models';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../services';

@Component({
  selector: 'app-report-upload',
  templateUrl: './report-upload.component.html',
  styleUrls: ['./report-upload.component.scss'],
})
export class ReportUploadComponent implements OnInit {
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
  //ejes hardcodeados antes de implementación
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
  //outputs e inputs
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
  //para scroll to top en cada cambio de eje
  @ViewChild('scroll') scroll: ElementRef = {} as ElementRef;
  constructor(private router: Router, private userSvc: UserService) {
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
  //BUSCA EL EJE INCOMPLETO Y LO RENDERIZA EN PANTALLA CON SUS VARIABLES
  axeToShow() {
    this.indexOfAxe = 0;
    for (let item of this.report) {
      this.indexOfAxe++;
      if (!item.complete) {
        this.axeToUpload = item.axe;
        this.variablesReport = item.variables;
        if (this.axeToUpload === this.report[0].axe) {
          this.flagBtnGoBack.emit(false);
        } else {
          this.flagBtnGoBack.emit(true);
        }
        break;
      }
    }
  }
  //SI EL EJE ESTÁ COMPLETO SE COLOCA COMPLETE TRUE PARA QUE PUEDA RENDERIZAR EL EJE SIGUIENTE QUE ESTÉ INCOMPLETO
  confirmCompleteAxe() {
    this.scroll.nativeElement.scrollTop = 0; //scroll to top cada vez que se renderiza un nuevo eje
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
  //ESTE METODO SE LANZA CUANDO SE DA CLICK AL BTN 'CONFIRMAR EJE' EN 'UPLOAD-REPORT' PARA QUE DESDE 'VARIABLE-UPLOAD' ENVÍE POR OUTPUT LA VARIABLE CARGADA A ESTE COMPONENTE
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
      }
    }
  }
  //ESTE METODO SE LANZA CUANDO SE DA CLICK AL BTN 'GUARDAR Y SALIR' EN 'UPLOAD-REPORT' PARA QUE DESDE 'VARIABLE-UPLOAD' ENVÍE POR OUTPUT LA VARIABLE CARGADA A ESTE COMPONENTE
  getVariablesToSaveExit($event: any) {
    this.variablesToUpload.push($event);
    if (this.variablesToUpload.length === this.variablesReport.length) {
      for (let item of this.variablesToUpload) {
        if (item) {
          this.reportPartial.push(item); // variables a guardar cuando se implemente endpoint de editar reporte
        }
      }
      this.router.navigate(['/user/dashboard/mis-reportes/pendientes']);
    }
  }
  //ESTE METODO SE LANZA CUANDO SE DA CLICK AL BTN 'ATRÁS' EN 'UPLOAD-REPORT' PARA QUE DESDE 'VARIABLE-UPLOAD' ENVÍE POR OUTPUT LA VARIABLE CARGADA A ESTE COMPONENTE
  getVariablesToSaveGoBack($event: any) {
    this.indexOfVariables++;
    if (this.indexOfVariables === this.variablesReport.length) {
      let i = 0;
      for (let item of this.report) {
        if (item.axe === this.axeToUpload && i > 0) {
          this.report[i - 1].complete = false;
          break;
        }
        i++;
      }
      this.axeToShow();
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
  // click al btn FINALIZAR REPORTE
  onSaveExit() {
    if (this.flagLastAxe) {
      this.router.navigate(['/user/dashboard/mis-reportes/pendientes']);
    }
  }
}
