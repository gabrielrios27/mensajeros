import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { CreatedComparativeReport } from '../../models';
import { AdminService } from '../../services';

@Component({
  selector: 'app-list-comparative-reports',
  templateUrl: './list-comparative-reports.component.html',
  styleUrls: ['./list-comparative-reports.component.scss'],
})
export class ListComparativeReportsComponent implements OnInit {
  mockReports: CreatedComparativeReport[] = [
    {
      fechaCreacion: '2022-10-08T14:12:50.352Z',
      idCentro: 0,
      idInforme: 1,
      idReporte1: 0,
      idReporte2: 0,
      nombreCentro: 'Club de Día',
      nombreReporte1: 'reporte Aasasasa',
      nombreReporte2: 'reporte B',
    },
    {
      fechaCreacion: '2022-09-11T14:12:50.352Z',
      idCentro: 0,
      idInforme: 2,
      idReporte1: 0,
      idReporte2: 0,
      nombreCentro: 'Club de Día',
      nombreReporte1: 'reporte 11',
      nombreReporte2: 'reporte 22',
    },
    {
      fechaCreacion: '2022-11-27T14:12:50.352Z',
      idCentro: 0,
      idInforme: 3,
      idReporte1: 0,
      idReporte2: 0,
      nombreCentro: 'Club de Día',
      nombreReporte1: 'reporte 33',
      nombreReporte2: 'reporte CC',
    },
  ];
  listOfReports: CreatedComparativeReport[] = [];
  listOfReports_toSearch: CreatedComparativeReport[] = [];
  listOfReports_toShow = new BehaviorSubject<CreatedComparativeReport[]>([]);
  itemSearch: string = '';
  toSearch: string = '';
  toSearchPrevius: string = '';
  twoParts: Boolean = false;

  // pagination
  listLenght: number = 0;
  itemsPerPage: number = 10;
  quantityOfPages: number = 1;
  currentPage: number = 1;
  listCurrentPage: CreatedComparativeReport[] =
    {} as CreatedComparativeReport[];
  initialItem: number = 1;
  finalItem: number = 10;
  //id de ruta
  idCenter: number = 0;
  // suscripciones
  onDestroy$: Subject<boolean> = new Subject();

  constructor(
    private _adminSvc: AdminService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.idCenter = this.getIdFromRute();
    this.getReportsList();
  }
  getIdFromRute(): number {
    let idToShow;
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      idToShow = params.get('id-centro');
    });
    return Number(idToShow);
  }
  getReportsList() {
    this.currentPage = this.getPageLocalStorage();
    this.listOfReports = this.mockReports;
    this.pageToShow(this.currentPage, this.listOfReports); //para paginación
  }
  //para paginación----
  pageToShow(page: number, list: CreatedComparativeReport[]) {
    this.setPageLocalStorage(page);
    this.listLenght = list.length;
    this.quantityOfPages = Math.ceil(this.listLenght / this.itemsPerPage);
    this.listCurrentPage = [];
    if (page <= 1) {
      this.listCurrentPage = list.slice(0, 10);
      this.listOfReports_toShow.next(this.listCurrentPage);
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
      this.listOfReports_toShow.next(this.listCurrentPage);
      this.initialItem = page * this.itemsPerPage - this.itemsPerPage + 1;
      this.finalItem =
        page * this.itemsPerPage -
        this.itemsPerPage +
        this.listCurrentPage.length;
    } else if (page >= this.quantityOfPages) {
      this.listCurrentPage = list.slice(
        this.quantityOfPages * this.itemsPerPage - this.itemsPerPage
      );
      this.listOfReports_toShow.next(this.listCurrentPage);
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
      this.pageToShow(this.currentPage, this.listOfReports);
    } else {
      this.currentPage = 1;
      this.pageToShow(this.currentPage, this.listOfReports);
    }
  }
  onClickAfter() {
    if (this.currentPage < this.quantityOfPages) {
      this.currentPage++;
      this.pageToShow(this.currentPage, this.listOfReports);
    } else {
      this.currentPage = this.quantityOfPages;
      this.pageToShow(this.currentPage, this.listOfReports);
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
