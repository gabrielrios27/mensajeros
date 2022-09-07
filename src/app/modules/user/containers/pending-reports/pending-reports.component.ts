import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import {
  AxeAndVariables,
  ReportInfo,
  ReportResponse,
  ReportToUpload,
  UserData,
  VariableRep,
} from '../../models';
import { UserService } from '../../services';
@Component({
  selector: 'app-pending-reports',
  templateUrl: './pending-reports.component.html',
  styleUrls: ['./pending-reports.component.scss'],
})
export class PendingReportsComponent implements OnInit, OnDestroy {
  reportToShow: ReportInfo;
  flagStartReport: boolean;
  flagDeleteReport: boolean;
  timerId: any;
  flagNoPendingReport: boolean | null;
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
    this.flagNoPendingReport = null;
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
    if (this.userData.centros.length === 0) {
      this.flagNoPendingReport = true;
    }
    for (let center of this.userData.centros) {
      let pendingReporsCenter = this.allPendingReports.filter(
        (report) => center.nombre === report.nom_centro
      );
      this.userPendingReports.push(...pendingReporsCenter);
      if (this.userPendingReports.length !== 0) {
        this.reportToShow = this.userPendingReports[0];
      } else {
        this.flagNoPendingReport = true;
      }
    }
    this.setReportInEveryPendingReport(this.userPendingReports);
  }
  //Obtiene el reporte con respuestas y variables y lo guarda en .reporteACargar del reporte seleccionado de pendingReports
  setReportInEveryPendingReport(pendingReports: ReportInfo[]) {
    for (let report of pendingReports) {
      report.reporteACargar = {
        fechaCompletado: {} as Date,
        idCentro: 0,
        idReporte: 0,
        respuestas: [],
        variables: [],
        ejeActual: 0,
        totalEjes: 0,
        ejesConVariables: [],
      };
      this.userSvc
        .getReportToUpload(report.idReporte, report.idCentro)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe({
          next: (data: ReportToUpload) => {
            if (!data.ejeActual) {
              data.ejeActual = 1;
            }
            report.reporteACargar = data;
          },
          error: (err) => {
            if (err.status === 401) {
              this.router.navigate(['/auth']);
            }
          },
        });
    }
  }

  onStartReport() {
    this.flagStartReport = true;
    this.timerId = setTimeout(() => {
      this.flagStartReport = false;
      this.router.navigate([
        'user/dashboard/mis-reportes/pendientes/carga-de-reporte/' +
          this.reportToShow.idReporte +
          '/' +
          this.reportToShow.idCentro,
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
