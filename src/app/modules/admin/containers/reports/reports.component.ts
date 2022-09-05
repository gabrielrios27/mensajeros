import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { Report } from '../../models/report';
import { axes, variable } from '../../models/admin.model';
import { Centro } from '../../models/centro';
import { report } from 'process';
import { DataService } from '../../services/data.service';

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
  listOfAxes: Array<axes> = [];
  listOfVariables: Array<variable> = [];
  report: Report = {} as Report;
  centerSelects: Array<any> = [];
  axesSelects: Array<any> = [];
  variablesSelects: Array<variable> = [];
  //
  flag: boolean = false;
  reports: Array<Report> = [];

  centers: Array<Centro> = [];

  constructor(
    private router: Router,
    private admin: AdminService,
    private cdr: ChangeDetectorRef,
    private data: DataService
  ) {}

  ngOnInit() {
    this.getReports();
    this.getReportLocalStorage();
    this.getCenters();
    this.getAxes();
    this.getVariables();
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
    this.centerSelects = [];
    this.variablesSelects = [];
    this.axesSelects = [];

    this.report = element;
    this.centerSelect();
    this.variablesSelect();
    this.axesSelect();
    this.showIt = true;
    // console.log(element)
  }

  closeModal() {
    this.showIt = false;
    this.centerSelects = [];
  }

  centerSelect() {
    for (let item of this.centers) {
      for (let c of this.report.centros) {
        // console.log(c)
        if (item.id == c) {
          this.centerSelects.push(item.nombre);
        }
      }
    }
  }

  variablesSelect() {
    for (let item of this.listOfVariables) {
      for (let c of this.report.variables) {
        if (item.id == c) {
          this.variablesSelects.push(item);
        }
      }
    }
    // console.log(this.variablesSelects)
  }

  axesSelect() {
    for (let item of this.listOfAxes) {
      // console.log(item.id)
      for (let c of this.variablesSelects) {
        // console.log(c.eje)
        if (item.id == c.eje.id) {
          // console.log(item)
          if (!this.axesSelects.includes(item.nombre)) {
            this.axesSelects.push(item.nombre);
          }
        }
      }
    }
    // console.log(this.centerSelects)
  }

  //

  getCenters() {
    this.admin.getCentros().subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        this.centers = data;
        // console.log(data);
      },
      error: (err) => {
        setTimeout(() => this.cdr.detectChanges());
        // console.log(err);
      },
    });
  }

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

  getAxes() {
    this.admin.getAxes().subscribe({
      next: (data: axes[]) => {
        this.listOfAxes = data;
        setTimeout(() => this.cdr.detectChanges());
        // console.log(this.listOfAxes);
      },
      error: (err) => {
        // console.log(err);
        if (err.status === 401) {
          this.router.navigate(['/auth']);
        }
      },
      complete: () => {
        // console.log('Request get axes complete');
      },
    });
  }

  getVariables() {
    this.admin.getVariables().subscribe({
      next: (data: variable[]) => {
        this.listOfVariables = data;
        setTimeout(() => this.cdr.detectChanges());
        // console.log(this.listOfVariables);
      },
      error: (err) => {
        // console.log(err);
        if (err.status === 401) {
          this.router.navigate(['/auth']);
        }
      },
      complete: () => {
        // console.log('Request get axes complete');
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

  edit(rep: any) {
    this.report = rep;
    this.data.editar = true
    this.router.navigate([
      'admin/dashboard/reportes/creacion-de-reportes/add-mod-report',
      this.report.id
    ]);
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

  getReportLocalStorage() {
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
