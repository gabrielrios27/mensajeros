import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { variable } from 'src/app/modules/admin/models';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil, timer } from 'rxjs';
import { UserService } from '../../services';
import { AxeAndVariables, ReportToUpload } from '../../models';

@Component({
  selector: 'app-report-upload',
  templateUrl: './report-upload.component.html',
  styleUrls: ['./report-upload.component.scss'],
})
export class ReportUploadComponent implements OnInit, OnDestroy {
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
  reportHC: any = [
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
      ],
      complete: false,
    },
  ];
  report: AxeAndVariables[];
  reportToUploadComplete: ReportToUpload;
  //outputs e inputs
  @Output() reportToUpload = new EventEmitter<any>();
  @Output() flagBtnGoBack = new EventEmitter<boolean>();
  @Output() flagLastAxeEmit = new EventEmitter<boolean>();
  @Output() flagEndReportEmit = new EventEmitter<boolean>();
  @Input('idReport') idReport: number = 0;
  @Input('idCenter') idCenter: number = 0;
  @Input('flagLastAxe') flagLastAxe: boolean = false;
  @Input('flagEndReport') flagEndReport: boolean = false;
  //para recibir click en el btn guardar y salir del comp. upload report
  clickSaveExitSubscription: Subscription;
  nameReport: string | number = '';
  axesInReport: string[] = [];
  axeToUpload: string = '';
  variablesReport: variable[] = {} as variable[];
  variablesToUpload: any[] = [];
  reportComplete: any[] = [];
  reportPartial: any[] = [];
  flagNoVariable: boolean = false;
  indexOfVariables: number = 0;
  indexOfAxe: number = 0;
  //para scroll to top en cada cambio de eje
  @ViewChild('scroll') scroll: ElementRef = {} as ElementRef;
  //para pop up success cuando eje fue completado
  flagAxeSuccess: boolean = false;
  //para pop up error cuando falta completar un input
  flagAxeError: boolean = false;
  timerId: any;
  // suscripciones
  onDestroy$: Subject<boolean> = new Subject();
  constructor(private router: Router, private userSvc: UserService) {
    this.clickSaveExitSubscription = this.userSvc
      .getClickSaveExit()
      .subscribe(() => {
        this.onSaveExit();
      });
    this.report = [];
    this.reportToUploadComplete = {} as ReportToUpload;
  }

  ngOnInit(): void {
    this.getReportToUpload();
    this.createBiAlphabet();
  }
  getReportToUpload() {
    this.userSvc
      .getReportToUpload(this.idReport, this.idCenter)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: ReportToUpload) => {
          this.reportToUploadComplete = data;
          this.nameReport = this.reportToUploadComplete.idReporte;
          this.listAxesOfReport(this.reportToUploadComplete);
        },
        error: (err) => {
          if (err.status === 401) {
            this.router.navigate(['/auth']);
          }
        },
      });
  }
  //Luego de obtener el reporte con variables y respuestas, lista los diferentes ejes de ese reporte
  listAxesOfReport(report: ReportToUpload) {
    let axeWithVariables: AxeAndVariables[] = [];
    this.axesInReport = [];
    for (let variable of report.variables) {
      if (this.axesInReport.length === 0) {
        this.axesInReport.push(variable.eje.nombre);
        axeWithVariables.push({
          idAxe: variable.eje.id,
          axe: variable.eje.nombre,
          variables: [],
          responses: [],
          complete: false,
        });
      } else if (!this.axesInReport.includes(variable.eje.nombre)) {
        this.axesInReport.push(variable.eje.nombre);
        axeWithVariables.push({
          idAxe: variable.eje.id,
          axe: variable.eje.nombre,
          variables: [],
          responses: [],
          complete: false,
        });
      }
    }
    report.ejesConVariables = axeWithVariables;
    this.getVariablesResponsesPerAxe(report);
  }
  getVariablesResponsesPerAxe(report: ReportToUpload) {
    let indexAxes: number = 0;
    report.ejesConVariables.map((axe) => {
      this.userSvc
        .getReportToUploadPerAxe(report.idReporte, report.idCentro, axe.idAxe)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe({
          next: (data: ReportToUpload) => {
            axe.variables = data.variables;
            axe.responses = data.respuestas;
            indexAxes++;
            if (indexAxes === report.totalEjes) {
              this.axeToShow();
              console.log('enttra en if final: ', report);
            }
          },
          error: (err) => {
            if (err.status === 401) {
              this.router.navigate(['/auth']);
            }
          },
        });
    });
  }
  //BUSCA EL EJE INCOMPLETO Y LO RENDERIZA EN PANTALLA CON SUS VARIABLES
  axeToShow() {
    this.indexOfAxe = 0;
    for (let item of this.reportToUploadComplete.ejesConVariables) {
      if (this.indexOfAxe === 0) {
        this.flagBtnGoBack.emit(false);
      } else {
        this.flagBtnGoBack.emit(true);
      }
      if (!item.complete) {
        this.axeToUpload = item.axe;
        this.variablesReport = item.variables;
      } else {
        this.indexOfAxe++;
      }

      console.log(this.indexOfAxe);
    }
  }
  //SI EL EJE ESTÁ COMPLETO SE COLOCA COMPLETE TRUE PARA QUE PUEDA RENDERIZAR EL EJE SIGUIENTE QUE ESTÉ INCOMPLETO
  confirmCompleteAxe() {
    //lanza modal de exito en la carga de eje
    this.flagAxeSuccess = true;
    setTimeout(() => {
      this.flagAxeSuccess = false;
    }, 3000);
    this.scroll.nativeElement.scrollTop = 0; //scroll to top cada vez que se renderiza un nuevo eje
    let i = 0;
    //coloca complete true al eje que se completo y checkea si es el ultimo eje
    for (let item of this.reportToUploadComplete.ejesConVariables) {
      if (item.axe === this.axeToUpload) {
        item.complete = true;
        i++;
      } else if (item.complete) {
        i++;
      }
    }
    //con el indice anterior chekea si es ultimo eje y emite ese valor a upload-report para mostrar botones de finalizar reporte
    if (i === this.reportToUploadComplete.ejesConVariables.length) {
      this.flagLastAxe = true;
      this.flagLastAxeEmit.next(this.flagLastAxe);
    }
  }
  //ESTE METODO SE LANZA CUANDO SE DA CLICK AL BTN 'CONFIRMAR EJE' EN 'UPLOAD-REPORT' PARA QUE DESDE 'VARIABLE-UPLOAD' ENVÍE POR OUTPUT LA VARIABLE CARGADA A ESTE COMPONENTE
  getVariablesToUpload($event: any) {
    this.variablesToUpload.push($event);
    this.flagNoVariable = false;
    //Cuando se cargaron todas las respuestas de los componentes variables-upload recien chekea si todas estan completas
    if (this.variablesToUpload.length === this.variablesReport.length) {
      for (let item of this.variablesToUpload) {
        if (item === undefined) {
          this.flagNoVariable = true;
          this.flagAxeError = true;
          this.timerId = setTimeout(() => {
            this.flagAxeError = false;
          }, 3000);
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
    console.log('atras - variab report', this.variablesReport);

    if (this.indexOfVariables === this.variablesReport.length) {
      let i = 0;
      for (let item of this.reportToUploadComplete.ejesConVariables) {
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
  onCloseModal($event: boolean) {
    if (!$event) {
      this.flagAxeError = false;
      clearTimeout(this.timerId);
    }
  }
  onConfirmEnd(value: boolean) {
    if (value) {
      //Aquí enviar repote con endpoint
      this.router.navigate(['/user/dashboard/mis-reportes/pendientes']); //cambiar ruta a reportes enviados cuando se cree ese componente
    } else {
      this.flagEndReport = false;
      this.flagEndReportEmit.next(false);
    }
  }
  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
}
