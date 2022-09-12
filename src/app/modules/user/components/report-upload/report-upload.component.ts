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
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil, timer } from 'rxjs';
import { UserService } from '../../services';
import {
  AxeAndVariables,
  ReportInfo,
  ReportResponse,
  ReportToUpload,
  VariableRep,
} from '../../models';

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
  report: AxeAndVariables[];
  reportToUploadComplete: ReportToUpload;
  //outputs e inputs
  @Output() reportToUpload = new EventEmitter<ReportToUpload>();
  @Output() flagBtnGoBack = new EventEmitter<boolean>();
  @Output() flagLastAxeEmit = new EventEmitter<boolean>();
  @Output() flagNextAxe = new EventEmitter<boolean>();
  @Output() flagEndReportEmit = new EventEmitter<boolean>();
  @Input('action') action: string = '';
  @Input('idReport') idReport: number = 0;
  @Input('idCenter') idCenter: number = 0;
  @Input('flagLastAxe') flagLastAxe: boolean = false;
  @Input('flagEndReport') flagEndReport: boolean = false;
  //para recibir click en el btn guardar y salir del comp. upload report
  clickSaveExitSubscription: Subscription;
  //recibe el click de ir atras cuando esta en la ultima pantalla de envio de reporte
  clickGoBackLastAxeSubscription: Subscription;
  //guarda el flag de comienzo de reporte para saber si empieza de cero el reporte o esta continuando con la carga
  flagStartReport: boolean;
  nameReport: string | number = '';
  axesInReport: string[] = [];
  axeToUpload: string = '';
  variablesReport: VariableRep[] = [];
  variablesToUpload: any[] = [];
  reportComplete: any[] = [];
  reportPartial: any[] = [];
  flagNoVariable: boolean = false;
  indexOfVariables: number = 0;
  indexOfAxe: number = 0;
  goBackIndex: number = 0;
  flagResponseGoBack: boolean = false;
  //guarda Todos los reportes pendientes
  allPendingReports: ReportInfo[];
  //para scroll to top en cada cambio de eje
  @ViewChild('scroll') scroll: ElementRef = {} as ElementRef;
  //para pop up success cuando eje fue completado
  flagAxeSuccess: boolean = false;
  //para pop up error cuando falta completar un input
  flagAxeError: boolean = false;
  timerId: any;
  //fecha actual en formato iso8601
  today: any;
  // suscripciones
  onDestroy$: Subject<boolean> = new Subject();
  constructor(private router: Router, private userSvc: UserService) {
    this.clickSaveExitSubscription = this.userSvc
      .getClickSaveExit()
      .subscribe(() => {
        this.onSaveExit();
      });
    this.clickGoBackLastAxeSubscription = this.userSvc
      .getClickGoBackLastAxe()
      .subscribe(() => {
        this.onGoBackLastAxe();
      });
    this.flagStartReport = false;
    this.allPendingReports = [];
    this.report = [];
    this.reportToUploadComplete = {} as ReportToUpload;
  }

  ngOnInit(): void {
    this.today = new Date().toISOString();
    this.getFlagStartReportSessionStorage();
    if (this.flagStartReport) {
      this.postReportToUpload();
    } else {
      this.getReportToUpload();
    }
    this.createBiAlphabet();
  }

  getFlagStartReportSessionStorage() {
    let flagStartReportStr = sessionStorage.getItem('flagStartReport');
    if (flagStartReportStr) {
      this.flagStartReport = JSON.parse(flagStartReportStr);
      sessionStorage.removeItem('flagStartReport');
    }
  }
  postReportToUpload() {
    this.userSvc
      .postReportToUpload(this.idReport, this.idCenter)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: ReportToUpload) => {
          this.reportToUploadComplete = data;
          this.getPendingReports(data);
          this.listAxesOfReport(this.reportToUploadComplete);
        },
        error: (err) => {
          if (err.status === 401) {
            this.router.navigate(['/auth']);
          }
        },
      });
  }
  putReportToUpload() {
    this.userSvc
      .putReportToUpload(
        this.idReport,
        this.idCenter,
        this.reportToUploadComplete
      )
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: ReportToUpload) => {},
        error: (err) => {
          if (err.status === 401) {
            this.router.navigate(['/auth']);
          }
        },
      });
  }

  getReportToUpload() {
    this.userSvc
      .getReportToUpload(this.idReport, this.idCenter)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: ReportToUpload) => {
          this.reportToUploadComplete = data;
          this.getPendingReports(data);
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
  getPendingReports(report: ReportToUpload) {
    this.userSvc
      .getPendingReports()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: ReportInfo[]) => {
          this.allPendingReports = data;
          this.allPendingReports.map((pendingReport) => {
            if (
              pendingReport.idReporte === report.idReporte &&
              pendingReport.idCentro === report.idCentro
            ) {
              this.nameReport = pendingReport.nombreReporte;
            }
          });
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
    this.setVariablesOfAxes(report);
  }
  //carga en cada reporte las variables de cada eje
  setVariablesOfAxes(report: ReportToUpload) {
    report.ejesConVariables.map((item) => {
      for (let variable of report.variables) {
        if (item.axe === variable.eje.nombre) {
          item.variables.push(variable);
          this.checkVariableResponse(item, variable, report.respuestas);
        }
      }
    });
  }
  //chekea si la variable ya esta cargada y si lo esta la guarda en response y tambien dentro de la variable para iterar de manera mas sencilla en upload report
  checkVariableResponse(
    item: AxeAndVariables,
    variable: VariableRep,
    responses: ReportResponse[]
  ) {
    for (let response of responses) {
      if (
        response.idVariable === variable.id &&
        (response.escala ||
          response.femenino ||
          response.masculino ||
          response.noBinario ||
          response.numerico ||
          response.textual)
      ) {
        //response se usara para ver si todas las variables fueron completadas
        item.responses.push(response);
      }
      if (response.idVariable === variable.id) {
        //respuesta dentro de la variable se usara para cargar en los inputs los valores de las respuestas.
        variable.respuesta = response;
      }
    }
    this.axeToShow();
  }
  //BUSCA EL EJE INCOMPLETO Y LO RENDERIZA EN PANTALLA CON SUS VARIABLES
  axeToShow() {
    this.indexOfAxe = 0;
    for (let item of this.reportToUploadComplete.ejesConVariables) {
      console.log('eje con var: ', item);
      //si ese eje no esta completo entonces lo renderiza en pantalla
      if (item.variables.length === item.responses.length) {
        item.complete = true;
      }
      if (!item.complete) {
        this.axeToUpload = item.axe;
        this.variablesReport = item.variables;
        break;
      } else {
        this.indexOfAxe++;
      }
    }

    if (
      this.indexOfAxe === this.reportToUploadComplete.ejesConVariables.length
    ) {
      this.reportToUploadComplete.ejeActual = this.indexOfAxe;
      this.axeToUpload =
        this.reportToUploadComplete.ejesConVariables[this.indexOfAxe - 1].axe;
      this.variablesReport =
        this.reportToUploadComplete.ejesConVariables[
          this.indexOfAxe - 1
        ].variables;
      this.flagLastAxe = true;
      this.flagLastAxeEmit.next(this.flagLastAxe);
      this.flagBtnGoBack.emit(false);
    } else {
      this.reportToUploadComplete.ejeActual = this.indexOfAxe + 1;
    }
    console.log(
      'eje actual fuera de for: ',
      this.reportToUploadComplete.ejeActual
    );
    this.reportToUpload.emit(this.reportToUploadComplete);
    //para mostrar o no mostrar el botón para ir atrás
    if (this.reportToUploadComplete.ejeActual === 1 || this.flagLastAxe) {
      this.flagBtnGoBack.emit(false);
    } else {
      this.flagBtnGoBack.emit(true);
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
        this.saveResponsesInReport(
          this.reportToUploadComplete,
          this.reportComplete
        );
        this.reportComplete = [];
        if (!this.flagLastAxe) {
          this.axeToShow();
        }
      }
    }
  }
  //SI EL EJE ESTÁ COMPLETO SE COLOCA COMPLETE TRUE PARA QUE PUEDA RENDERIZAR EL EJE SIGUIENTE QUE ESTÉ INCOMPLETO
  confirmCompleteAxe() {
    //lanza modal de exito en la carga de eje
    this.flagAxeSuccess = true;
    setTimeout(() => {
      this.flagAxeSuccess = false;
    }, 3000);
    //scroll to top cada vez que se renderiza un nuevo eje
    this.scroll.nativeElement.scrollTop = 0;
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
  //guarda las respuestas en todo el reporte
  saveResponsesInReport(
    report: ReportToUpload,
    responsesUpload: ReportResponse[]
  ) {
    let flagResponseExist: boolean = false;
    responsesUpload.map((respUpload) => {
      for (let respuestaRep of report.respuestas) {
        if (respuestaRep.idVariable === respUpload.idVariable) {
          respuestaRep.numerico = respUpload.numerico;
          respuestaRep.escala = respUpload.escala;
          respuestaRep.femenino = respUpload.femenino;
          respuestaRep.masculino = respUpload.masculino;
          respuestaRep.noBinario = respUpload.noBinario;
          respuestaRep.observaciones = respUpload.observaciones;
          respuestaRep.textual = respUpload.textual;
          flagResponseExist = true;
        }
      }
      if (!flagResponseExist) {
        report.respuestas.push(respUpload);
      }
      report.ejesConVariables.map((axe) => {
        if (axe.axe === this.axeToUpload) {
          axe.responses = responsesUpload;
          axe.variables.map((variable) => {
            if (variable.id === respUpload.idVariable) {
              variable.respuesta = respUpload;
            }
          });
        }
      });
    });
    this.putReportToUpload();
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
      this.saveResponsesInReport(
        this.reportToUploadComplete,
        this.reportPartial
      );
      this.variablesToUpload = [];
      this.router.navigate(['/user/dashboard/mis-reportes/pendientes']);
    }
  }
  //ESTE METODO SE LANZA CUANDO SE DA CLICK AL BTN 'ATRÁS' EN 'UPLOAD-REPORT' PARA QUE DESDE 'VARIABLE-UPLOAD' ENVÍE POR OUTPUT LA VARIABLE CARGADA A ESTE COMPONENTE
  getVariablesToSaveGoBack($event: ReportResponse[]) {
    this.goBackIndex++;
    if ($event !== undefined) {
      this.variablesToUpload.push($event);
      this.flagResponseGoBack = true;
    }
    if (
      this.goBackIndex === this.variablesReport.length &&
      this.flagResponseGoBack
    ) {
      this.saveResponsesInReport(
        this.reportToUploadComplete,
        this.variablesToUpload
      );
    }
    if (this.goBackIndex === this.variablesReport.length) {
      this.reportToUploadComplete.ejeActual--;
      this.axeToUpload =
        this.reportToUploadComplete.ejesConVariables[
          this.reportToUploadComplete.ejeActual - 1
        ].axe;
      this.variablesReport =
        this.reportToUploadComplete.ejesConVariables[
          this.reportToUploadComplete.ejeActual - 1
        ].variables;
      this.reportToUploadComplete.ejesConVariables[
        this.reportToUploadComplete.ejeActual - 1
      ].complete = false;
      this.reportToUpload.emit(this.reportToUploadComplete);
      //para mostrar o no mostrar el botón para ir atrás
      if (this.reportToUploadComplete.ejeActual === 1) {
        this.flagBtnGoBack.emit(false);
      } else {
        this.flagBtnGoBack.emit(true);
      }
      console.log(
        'nuevo eje actual: ',
        this.reportToUploadComplete.ejesConVariables[
          this.reportToUploadComplete.ejeActual - 1
        ]
      );
      console.log(
        'reporte completo en nuevo eje actual: ',
        this.reportToUploadComplete
      );

      this.variablesToUpload = [];
      this.goBackIndex = 0;
      this.flagResponseGoBack = false;
    }
  }
  onGoBackLastAxe() {
    this.reportToUploadComplete.ejesConVariables[
      this.reportToUploadComplete.ejeActual - 1
    ].complete = false;
    console.log(
      'onGoBackLastAxe() eje actual: ',
      this.reportToUploadComplete.ejeActual
    );

    this.reportToUpload.emit(this.reportToUploadComplete);
    //para mostrar o no mostrar el botón para ir atrás
    if (this.reportToUploadComplete.ejeActual === 1) {
      this.flagBtnGoBack.emit(false);
    } else {
      this.flagBtnGoBack.emit(true);
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
      this.reportToUploadComplete.fechaCompletado = this.today;
      this.putReportToUpload();
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
