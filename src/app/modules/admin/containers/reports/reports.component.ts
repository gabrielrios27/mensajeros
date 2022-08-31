import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { Report } from '../../models/report';
import { axes } from '../../models/admin.model';

@Component({
  selector: 'app-reports',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reports.component.html',
  styleUrls: ['reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  nombre: any;

  flagEdited: boolean = false;
  flagNew: boolean = false;
  flagDelete: boolean = false;
  idToDelete: number = 0;

  // pagination
  userListComplete: Array<Report> = new Array();
  listLenght: number = 0;
  itemsPerPage: number = 10;
  quantityOfPages: number = 1;
  currentPage: number = 1;
  listCurrentPage: Array<Report> = new Array();
  initialItem: number = 1;
  finalItem: number = 10;
  //

  // variables para visualizar reporte
  name = 'old name';
  showIt = false;
  arrayAxes: Array<axes> = [];
  //

  flag: boolean = false;
  reports: Array<Report> = [];

  constructor(
    private router: Router,
    private admin: AdminService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getReports();
    this.getUserLocalStorage();
  }

  busca(e: string) {
    if (e.toLocaleLowerCase() == '') {
      this.ngOnInit();
    } else {
      this.reports = this.reports.filter((res) => {
        return res.nombre
          .toLocaleLowerCase()
          .match(this.nombre.toLocaleLowerCase());
      });
    }
  }

  //visualizar reporte
  showModal(element: Report) {
    this.showIt = true;
  }

  closeModal(newName: string) {
    this.showIt = false;
    if (newName) this.name = newName;
  }

  //

  getReports() {
    //this.currentPage = this.getPageLocalStorage();
    this.admin.getResports().subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        this.reports = data;
        this.pageToShow(this.currentPage, this.reports); //para paginación
        
      },
      error: (err) => {
        setTimeout(() => this.cdr.detectChanges());
        
      },
    });
  }

  deleteReport() {
    this.admin.deleteReport(this.idToDelete).subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        this.pageToShow(this.currentPage, this.reports); //para paginación
        this.getReports();
        this.close();
        
      },
      error: (err) => {
        setTimeout(() => this.cdr.detectChanges());
        
      },
    });
  }

  create() {
    this.router.navigate([
      'admin/dashboard/reportes/creacion-de-reportes/add-mod-report',
    ]);
  }

  //para paginación----
  pageToShow(page: number, list: Report[]) {
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

  onClickDelete(id: number) {
    this.flagDelete = true;
    this.idToDelete = id;
  }
  
  getUserLocalStorage() {
    let newOrEditeduser = localStorage.getItem('newOrEditedReport');
    if (newOrEditeduser) {
      setTimeout(() => {
        this.close();
      }, 3000);
    }

    let isNewUserStr = localStorage.getItem('isNewReport');
    let isNewUser;
    if (isNewUserStr) {
      isNewUser = JSON.parse(isNewUserStr);
    }
    if (newOrEditeduser) {
      if (isNewUser) {
        this.flagNew = true;
        localStorage.removeItem('isNewReport');
      } else {
        this.flagEdited = true;
      }
      localStorage.removeItem('newOrEditedReport');
    }
  }

  close() {
    this.flagNew = false;
    this.flagEdited = false;
    this.flagDelete = false;
  }
}
