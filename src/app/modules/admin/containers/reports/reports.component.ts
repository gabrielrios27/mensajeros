import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface PeriodicElement {
  id: number
  numero: string,
  fechaCreacion: Date
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1 ,numero: 'reporte 1', fechaCreacion: new Date},
  {id: 2 ,numero: 'reporte 2', fechaCreacion: new Date}
];


@Component({
  selector: 'app-reports',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reports.component.html',
  styleUrls: ['reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  numero: any
  reports: Array<PeriodicElement> = ELEMENT_DATA;

  // pagination
  userListComplete: Array<PeriodicElement> = new Array();
  listLenght: number = 0;
  itemsPerPage: number = 10;
  quantityOfPages: number = 1;
  currentPage: number = 1;
  listCurrentPage: Array<PeriodicElement> = new Array();
  initialItem: number = 1;
  finalItem: number = 10;

  constructor(private router: Router) {}

  ngOnInit() {
    this.reports = ELEMENT_DATA;
  }

  busca(e: string) {

    if (e.toLocaleLowerCase() == '') {
      this.ngOnInit()
    }
    else {
      this.reports = this.reports.filter(res => {
        return res.numero.toLocaleLowerCase().match(this.numero.toLocaleLowerCase())
      })
    }

  }

  create(){ 
    this.router.navigate(['admin/dashboard/reportes/creacion-de-reportes/add-mod-report'])
    
  }

  edit(report: PeriodicElement){

  }

  onClickDelete(id:number){

  }

  //para paginación----
  pageToShow(page: number, list: PeriodicElement[]) {
    // this.setPageLocalStorage(page);
    this.listLenght = list.length;
    this.quantityOfPages = Math.ceil(this.listLenght / this.itemsPerPage);
    this.listCurrentPage = [];
    if (page <= 1) {
      this.listCurrentPage = list.slice(0, 10);
      this.reports = this.listCurrentPage;
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
      this.reports = this.listCurrentPage;
      this.initialItem = page * this.itemsPerPage - this.itemsPerPage + 1;
      this.finalItem =
        page * this.itemsPerPage -
        this.itemsPerPage +
        this.listCurrentPage.length;
    } else if (page >= this.quantityOfPages) {
      this.listCurrentPage = list.slice(
        this.quantityOfPages * this.itemsPerPage - this.itemsPerPage
      );
      this.reports = this.listCurrentPage;
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
      this.pageToShow(this.currentPage, this.userListComplete);
    } else {
      this.currentPage = 1;
      this.pageToShow(this.currentPage, this.userListComplete);
    }
  }
  onClickAfter() {
    if (this.currentPage < this.quantityOfPages) {
      this.currentPage++;
      this.pageToShow(this.currentPage, this.userListComplete);
    } else {
      this.currentPage = this.quantityOfPages;
      this.pageToShow(this.currentPage, this.userListComplete);
    }
  }
}
