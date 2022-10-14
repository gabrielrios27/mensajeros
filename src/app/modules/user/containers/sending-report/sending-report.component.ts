import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Comments, ReceivedReport } from 'src/app/modules/admin/models';
import { AdminService } from 'src/app/modules/admin/services';
import { ReportComplete } from '../../models';
import { UserService } from '../../services';

@Component({
  selector: 'app-sending-report',
  templateUrl: './sending-report.component.html',
  styleUrls: ['./sending-report.component.scss'],
})
export class SendingReportComponent implements OnInit {
  //para buscador
  itemSearch: string = '';
  toSearch: string = '';
  toSearchPrevius: string = '';
  twoParts: Boolean = false;

  // pagination
  listLenght: number = 0;
  itemsPerPage: number = 10;
  quantityOfPages: number = 1;
  currentPage: number = 1;
  listCurrentPage: ReportComplete[] = {} as ReportComplete[];
  initialItem: number = 1;
  finalItem: number = 10;

  // lista de items a mostrar

  listOfReceivedReport: ReportComplete[] = [];
  listOfReceivedReport_toSearch: ReportComplete[] = [];
  listOfReceivedReport_toShow = new BehaviorSubject<ReportComplete[]>([]);
  //modal de comentarios y reseñas
  flagPopUpComments: boolean = false;
  commentsToShow: Comments[] = [];
  //para spinner de icono descarga de excel
  idsDownload: string[] = [];
  //flag reporte enviado
  flagCreatedReport: boolean = false;
  modalText: string = '¡Reporte enviado con éxito a ONG!';
  // suscripciones
  onDestroy$: Subject<boolean> = new Subject();

  constructor(private router: Router, private _userSvc: UserService) {}

  ngOnInit(): void {
    this.getFlagCreatedReportUser();
    this.getReportList();
  }
  getReportList() {
    this.currentPage = this.getPageLocalStorage();
    this._userSvc
      .getCompleteReports()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: ReportComplete[]) => {
          this.listOfReceivedReport = data;
          this.pageToShow(this.currentPage, this.listOfReceivedReport); //para paginación
        },
        error: (err) => {
          if (err.status === 401) {
            this.router.navigate(['/auth']);
          }
        },
      });
  }

  //para paginación----
  pageToShow(page: number, list: ReportComplete[]) {
    this.setPageLocalStorage(page);
    this.listLenght = list.length;
    this.quantityOfPages = Math.ceil(this.listLenght / this.itemsPerPage);
    this.listCurrentPage = [];
    if (page <= 1) {
      this.listCurrentPage = list.slice(0, 10);
      this.listOfReceivedReport_toShow.next(this.listCurrentPage);
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
      this.listOfReceivedReport_toShow.next(this.listCurrentPage);
      this.initialItem = page * this.itemsPerPage - this.itemsPerPage + 1;
      this.finalItem =
        page * this.itemsPerPage -
        this.itemsPerPage +
        this.listCurrentPage.length;
    } else if (page >= this.quantityOfPages) {
      this.listCurrentPage = list.slice(
        this.quantityOfPages * this.itemsPerPage - this.itemsPerPage
      );
      this.listOfReceivedReport_toShow.next(this.listCurrentPage);
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
      this.pageToShow(this.currentPage, this.listOfReceivedReport);
    } else {
      this.currentPage = 1;
      this.pageToShow(this.currentPage, this.listOfReceivedReport);
    }
  }
  onClickAfter() {
    if (this.currentPage < this.quantityOfPages) {
      this.currentPage++;
      this.pageToShow(this.currentPage, this.listOfReceivedReport);
    } else {
      this.currentPage = this.quantityOfPages;
      this.pageToShow(this.currentPage, this.listOfReceivedReport);
    }
  }
  setPageLocalStorage(page: number) {
    localStorage.setItem('completeReportPage', JSON.stringify(page));
  }

  getPageLocalStorage(): number {
    let pageLocalStorage: number = 1;
    let pageLocalStorageJSON = localStorage.getItem('completeReportPage');
    if (pageLocalStorageJSON) {
      pageLocalStorage = JSON.parse(pageLocalStorageJSON);
    }
    return pageLocalStorage;
  }
  //--------------------------------------------

  //buscador----------------------------
  Search(e: string) {
    /*informacion a buscar*/
    this.toSearch = e.toUpperCase();
    this.listOfReceivedReport_toSearch = [];

    for (let item of this.listOfReceivedReport) {
      if (item.nombreReporte.toUpperCase().includes(this.toSearch)) {
        /*si el item incluye la cadena de texto a buscar entonces se guarda en el nuevo arreglo */
        this.listOfReceivedReport_toSearch.push(item);
        this.twoParts = false;
      }
    }
    if (e !== '') {
      /*si el input no esta vacio se muestra el arreglo de ejes que coinciden con la busqueda*/
      this.TwoPartsSearch();
    } else {
      /*si el input esta vacio se muestra el arreglo de todos los ejes*/
      this.pageToShow(this.currentPage, this.listOfReceivedReport); //para paginación
    }
  }

  /*TwoPartsSearch: cuando no hay coincidencias con lo escrito en el input entonces este valor(del input,toSearch) se divide en dos desde la ultima coincidencia y se buscan ambas partes en el arreglo de ejes */
  TwoPartsSearch() {
    if (this.listOfReceivedReport_toSearch.length == 0 || this.twoParts) {
      this.twoParts = true;
      let toSearchPreviusLength = this.toSearchPrevius.length;
      let toSearchOne: string = this.toSearchPrevius;
      let toSearchTwo: string = this.toSearch.substring(toSearchPreviusLength);

      for (let item of this.listOfReceivedReport) {
        if (
          item.nombreReporte.toUpperCase().includes(toSearchOne) &&
          item.nombreReporte.toUpperCase().includes(toSearchTwo)
        ) {
          /*si el eje incluye las cadenas de texto a buscar entonces se guarda en el arreglo */
          this.listOfReceivedReport_toSearch.push(item);
        }
      }
      this.listOfReceivedReport_toShow.next(this.listOfReceivedReport_toSearch);
    } else {
      this.twoParts = false;
      this.listOfReceivedReport_toShow.next(this.listOfReceivedReport_toSearch);
      this.toSearchPrevius =
        this.toSearch; /*se guarda la ultima palabra buscada con la que hubo coincidencias */
    }
  }

  getFlagCreatedReportUser() {
    let flagStr = sessionStorage.getItem('createdReportUser');
    if (flagStr) {
      this.flagCreatedReport = JSON.parse(flagStr);
      sessionStorage.removeItem('createdReportUser');
      setTimeout(() => {
        this.flagCreatedReport = false;
      }, 3000);
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
  }
}
