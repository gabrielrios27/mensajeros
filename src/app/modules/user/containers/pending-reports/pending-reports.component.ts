import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userInfo } from 'os';
import { Subject, takeUntil } from 'rxjs';
import { ReportInfo, UserData } from '../../models';
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
  reportToShow: any;
  flagStartReport: boolean;
  flagDeleteReport: boolean;
  timerId: any;
  //guarda datos del usuario logeado
  userData: UserData;
  //guarda Todos los reportes pendientes
  allPendingReports: ReportInfo[];
  //guarda los reportes pendientes del usuario logeado
  userPendingReports: ReportInfo[];
  // suscripciones
  onDestroy$: Subject<boolean> = new Subject();
  constructor(private router: Router, private userSvc: UserService) {
    this.reportToShow = this.list[0];
    this.flagDeleteReport = false;
    this.flagStartReport = false;
    this.timerId = 0;
    this.userData = {} as UserData;
    this.allPendingReports = [];
    this.userPendingReports = [];
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
          this.saveUserPendingReports();
        },
        error: (err) => {
          if (err.status === 401) {
            this.router.navigate(['/auth']);
          }
        },
      });
  }
  saveUserPendingReports() {
    for (let center of this.userData.centros) {
      this.userPendingReports = this.allPendingReports.map((report) => {
        let filterUserReport: ReportInfo = {} as ReportInfo;
        if (center.nombre === report.nom_centro) {
          filterUserReport = report;
        }
        return filterUserReport;
      });
      console.log('reportes filtrados: ', this.userPendingReports);
    }
  }
  onStartReport() {
    this.flagStartReport = true;
    this.timerId = setTimeout(() => {
      this.flagStartReport = false;
      this.router.navigate([
        'user/dashboard/mis-reportes/pendientes/carga-de-reporte/' +
          this.reportToShow.id,
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
