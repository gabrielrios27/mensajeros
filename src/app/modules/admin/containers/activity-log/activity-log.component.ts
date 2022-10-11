import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Activity } from '../../models';
import { Users } from '../../models/users';
import { AdminService } from '../../services';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.scss'],
})
export class ActivityLogComponent implements OnInit {
  mockActivity: Activity[] = [
    {
      actividad: 'Inicia sesión',
      fechaHora: '2022-10-08T14:12:50.352Z',
      idCentro: 1,
      idLog: 1,
      idReporte: 2,
      nombreCentro: 'Club de día',
      nombreReporte: 'reporte1',
    },
    {
      actividad: 'Guardó y cerró reporte en proceso AAB23',
      fechaHora: '2022-10-08T14:50:50.352Z',
      idCentro: 1,
      idLog: 2,
      idReporte: 3,
      nombreCentro: 'Club de día',
      nombreReporte: 'reporte2',
    },
    {
      actividad: 'Comenzó la carga del reporte AAB23',
      fechaHora: '2022-10-08T15:12:50.352Z',
      idCentro: 1,
      idLog: 1,
      idReporte: 3,
      nombreCentro: 'Club de día',
      nombreReporte: 'reporteAA',
    },
  ];
  listOfActivity: Activity[] = [];
  listOfActivity_toSearch: Activity[] = [];
  listOfActivity_toShow = new BehaviorSubject<Activity[]>([]);
  itemSearch: string = '';
  toSearch: string = '';
  toSearchPrevius: string = '';
  twoParts: Boolean = false;

  // pagination
  listLenght: number = 0;
  itemsPerPage: number = 10;
  quantityOfPages: number = 1;
  currentPage: number = 1;
  listCurrentPage: Activity[] = {} as Activity[];
  initialItem: number = 1;
  finalItem: number = 10;
  //id de ruta
  idUser: number = 0;
  userAsig: Users = {} as Users;
  // suscripciones
  onDestroy$: Subject<boolean> = new Subject();

  constructor(
    private _adminSvc: AdminService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.idUser = this.getIdFromRute();
    this.getUserData(this.idUser);
    this.getReportsList();
  }
  getIdFromRute(): number {
    let idToShow;
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      idToShow = params.get('id-usuario');
    });
    return Number(idToShow);
  }
  getUserData(id: number) {
    this._adminSvc
      .getUser(this.idUser)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: Users) => {
          this.userAsig = data;
        },
        error: (err) => {
          if (err.status === 401) {
            this.router.navigate(['/auth']);
          }
        },
      });
  }
  getReportsList() {
    this.currentPage = this.getPageLocalStorage();
    this.listOfActivity = this.mockActivity;
    this.orderReportsLastCreatedGoFirst(this.listOfActivity);
    this.pageToShow(this.currentPage, this.listOfActivity); //para paginación

    // this._adminSvc
    //   .getActivityLogByIdUser(this.idUser)
    //   .pipe(takeUntil(this.onDestroy$))
    //   .subscribe({
    //     next: (data: Activity[]) => {
    //       this.listOfActivity = data;
    //       this.orderReportsLastCreatedGoFirst(this.listOfActivity);
    //       this.pageToShow(this.currentPage, this.listOfActivity); //para paginación
    //     },
    //     error: (err) => {
    //       if (err.status === 401) {
    //         this.router.navigate(['/auth']);
    //       }
    //     },
    //   });
  }
  orderReportsLastCreatedGoFirst(list: Activity[]) {
    list.sort(
      (a: Activity, b: Activity) =>
        Date.parse(b.fechaHora) - Date.parse(a.fechaHora)
    );
  }
  //para paginación----
  pageToShow(page: number, list: Activity[]) {
    this.setPageLocalStorage(page);
    this.listLenght = list.length;
    this.quantityOfPages = Math.ceil(this.listLenght / this.itemsPerPage);
    this.listCurrentPage = [];
    if (page <= 1) {
      this.listCurrentPage = list.slice(0, 10);
      this.listOfActivity_toShow.next(this.listCurrentPage);
      this.initialItem = 1;
      if (this.listLenght < this.itemsPerPage) {
        this.finalItem = this.listLenght;
      } else {
        this.finalItem = 10;
      }
    } else if (page > 1 && page < this.quantityOfPages) {
      this.listCurrentPage = list.slice(
        page * this.itemsPerPage - this.itemsPerPage,
        page * this.itemsPerPage
      );
      this.listOfActivity_toShow.next(this.listCurrentPage);
      this.initialItem = page * this.itemsPerPage - this.itemsPerPage + 1;
      this.finalItem =
        page * this.itemsPerPage -
        this.itemsPerPage +
        this.listCurrentPage.length;
    } else if (page >= this.quantityOfPages) {
      this.listCurrentPage = list.slice(
        this.quantityOfPages * this.itemsPerPage - this.itemsPerPage
      );
      this.listOfActivity_toShow.next(this.listCurrentPage);
      this.initialItem =
        this.quantityOfPages * this.itemsPerPage - this.itemsPerPage + 1;
      this.finalItem =
        this.quantityOfPages * this.itemsPerPage -
        this.itemsPerPage +
        this.listCurrentPage.length;
    }
  }
  onClickBefore() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageToShow(this.currentPage, this.listOfActivity);
    } else {
      this.currentPage = 1;
      this.pageToShow(this.currentPage, this.listOfActivity);
    }
  }
  onClickAfter() {
    if (this.currentPage < this.quantityOfPages) {
      this.currentPage++;
      this.pageToShow(this.currentPage, this.listOfActivity);
    } else {
      this.currentPage = this.quantityOfPages;
      this.pageToShow(this.currentPage, this.listOfActivity);
    }
  }
  setPageLocalStorage(page: number) {
    localStorage.setItem('axeWithVariablesPage', JSON.stringify(page));
  }
  setNameAxeLocalStorage(idInforme: number) {
    localStorage.setItem('idComparativeReport', JSON.stringify(idInforme));
  }
  getPageLocalStorage(): number {
    let pageLocalStorage: number = 1;
    let pageLocalStorageJSON = localStorage.getItem('idComparativeReport');
    if (pageLocalStorageJSON) {
      pageLocalStorage = JSON.parse(pageLocalStorageJSON);
    }
    return pageLocalStorage;
  }

  //para cerrar modales------------------
  close() {}

  ngOnDestroy() {
    this.onDestroy$.next(true);
  }
}
