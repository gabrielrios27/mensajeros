import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userInfo } from 'os';
import { Subject, takeUntil } from 'rxjs';
import {
  AxeAndVariables,
  ReportInfo,
  ReportResponse,
  ReportToUpload,
  UserData,
} from '../../models';
import { UserService } from '../../services';
@Component({
  selector: 'app-pending-reports',
  templateUrl: './pending-reports.component.html',
  styleUrls: ['./pending-reports.component.scss'],
})
export class PendingReportsComponent implements OnInit, OnDestroy {
  list: any = [
    {
      id: 1,
      numberReport: 'C00010',
      center: 'Colibries',
      period: '07/2021-12/2121',
      limitDate: '02/01/2022',
      lastAxeComplete: 2,
      quantityOfAxes: 4,
    },
    {
      id: 2,
      numberReport: 'C00011',
      center: 'La Balsa',
      period: '07/2021-12/2121',
      limitDate: '02/01/2022',
      lastAxeComplete: 1,
      quantityOfAxes: 8,
    },
    {
      id: 3,
      numberReport: 'C00012',
      center: 'La Balsa',
      period: '07/2021-12/2121',
      limitDate: '02/01/2022',
      lastAxeComplete: 0,
      quantityOfAxes: 5,
    },
    {
      id: 4,
      numberReport: 'C00013',
      center: 'Colibries',
      period: '07/2021-12/2121',
      limitDate: '02/01/2022',
      lastAxeComplete: 0,
      quantityOfAxes: 6,
    },
  ];
  reportToShowExample: any = {
    id: 4,
    numberReport: 'C00013',
    center: 'Colibries',
    period: '07/2021-12/2121',
    limitDate: '02/01/2022',
    lastAxeComplete: 0,
    quantityOfAxes: 6,
  };
  reportToShow: ReportInfo;
  flagStartReport: boolean;
  flagDeleteReport: boolean;
  timerId: any;
  //guarda datos del usuario logeado
  userData: UserData;
  //guarda Todos los reportes pendientes
  allPendingReports: ReportInfo[];
  //guarda los reportes pendientes del usuario logeado
  userPendingReports: ReportInfo[];
  //Guarda periodos desde y hasta con mes y año
  periodFrom: string;
  periodTo: string;
  // suscripciones
  onDestroy$: Subject<boolean> = new Subject();
  constructor(private router: Router, private userSvc: UserService) {
    this.reportToShow = {} as ReportInfo;
    this.flagDeleteReport = false;
    this.flagStartReport = false;
    this.timerId = 0;
    this.userData = {} as UserData;
    this.allPendingReports = [];
    this.userPendingReports = [];
    this.periodFrom = '';
    this.periodTo = '';
  }

  ngOnInit(): void {
    this.getUserData();
    this.getPendingReports();
  }
  getUserData() {
    this.userSvc
      .getUserData()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: UserData) => {
          this.userData = data;
          console.log('datos de usuario', this.userData);
          if (this.allPendingReports.length !== 0) {
            this.saveUserPendingReports();
          }
        },
        error: (err) => {
          if (err.status === 401) {
            this.router.navigate(['/auth']);
          }
        },
      });
  }
  getPendingReports() {
    this.userSvc
      .getPendingReports()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: ReportInfo[]) => {
          this.allPendingReports = data;
          console.log(
            'todos los reportes pendientes: ',
            this.allPendingReports
          );
          if (this.userData.id) {
            this.saveUserPendingReports();
          }
        },
        error: (err) => {
          if (err.status === 401) {
            this.router.navigate(['/auth']);
          }
        },
      });
  }
  //usa los centros del usuario logeado para buscar los reportes asignados a los centros de ese usuario.
  saveUserPendingReports() {
    for (let center of this.userData.centros) {
      let pendingReporsCenter = this.allPendingReports.filter(
        (report) => center.nombre === report.nom_centro
      );
      this.userPendingReports.push(...pendingReporsCenter);
      console.log('reportes filtrados: ', this.userPendingReports);
      if (this.userPendingReports.length !== 0) {
        this.reportToShow = this.userPendingReports[0];
      }
    }
    this.setReportInEveryPendingReport(this.userPendingReports);
  }
  //Obtiene el reporte con respuestas y variables y lo guarda en .reporteACargar del reporte seleccionado de pendingReports
  setReportInEveryPendingReport(pendingReports: ReportInfo[]) {
    for (let report of pendingReports) {
      this.userSvc
        .getReportToUpload(report.idReporte, report.idCentro)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe({
          next: (data: ReportToUpload) => {
            report.reporteACargar = data;
            console.log(pendingReports);
            this.listAxesOfReport(report);
          },
          error: (err) => {
            if (err.status === 401) {
              this.router.navigate(['/auth']);
            }
          },
        });
    }
  }
  //Luego de obtener el reporte con variables y respuestas, lista los diferentes ejes de ese reporte
  listAxesOfReport(report: ReportInfo) {
    let axeWithVariables: AxeAndVariables[] = [];
    let axesInReport: string[] = [];
    for (let variable of report.reporteACargar.variables) {
      if (axesInReport.length === 0) {
        axesInReport.push(variable.eje.nombre);
        axeWithVariables.push({
          axe: variable.eje.nombre,
          variables: [],
          responses: [],
          complete: false,
        });
      } else if (!axesInReport.includes(variable.eje.nombre)) {
        axesInReport.push(variable.eje.nombre);
        axeWithVariables.push({
          axe: variable.eje.nombre,
          variables: [],
          responses: [],
          complete: false,
        });
      }
    }
    report.ejesConVariables = axeWithVariables;
    report.cantidadDeEjes = axeWithVariables.length;
    this.setVariablesOfAxes(report);
  }
  //carga en cada reporte las variables de cada eje
  setVariablesOfAxes(report: ReportInfo) {
    report.ejesConVariables.map((item) => {
      for (let variable of report.reporteACargar.variables) {
        if (item.axe === variable.eje.nombre) {
          item.variables.push(variable);
          this.checkVariableResponse(
            item,
            variable.id,
            report.reporteACargar.respuestas
          );
        }
      }
    });
    console.log('report con ejes y var: ', report);
  }
  //chekea si la variable ya esta cargada
  checkVariableResponse(
    item: AxeAndVariables,
    id: number,
    responses: ReportResponse[]
  ) {
    for (let response of responses) {
      if (response.idVariable === id) {
        item.responses.push(response);
      }
    }
  }
  onStartReport() {
    this.flagStartReport = true;
    this.timerId = setTimeout(() => {
      this.flagStartReport = false;
      this.router.navigate([
        'user/dashboard/mis-reportes/pendientes/carga-de-reporte/' +
          this.reportToShow.idReporte,
      ]);
    }, 6000);
  }

  onClickReport(item: any) {
    this.reportToShow = item;
  }
  onDeleteReport(value: boolean) {
    this.flagDeleteReport = value;
  }

  ngOnDestroy(): void {
    clearTimeout(this.timerId);
    this.onDestroy$.next(true);
  }
}
