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
import { BehaviorSubject } from 'rxjs';

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
  listOfReport_toShow = new BehaviorSubject<axes[]>([]);
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
    this.data.flagDuplicated = false;
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
  }

  closeModal() {
    this.showIt = false;
    this.centerSelects = [];
  }

  centerSelect() {
    for (let item of this.centers) {
      for (let c of this.report.centros) {
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
  }

  axesSelect() {
    for (let item of this.listOfAxes) {
      for (let c of this.variablesSelects) {
        if (item.id == c.eje.id) {
          if (!this.axesSelects.includes(item.nombre)) {
            this.axesSelects.push(item.nombre);
          }
        }
      }
    }
  }

  //

  getCenters() {
    this.admin.getCentros().subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        this.centers = data;
      },
      error: (err) => {
        setTimeout(() => this.cdr.detectChanges());
      },
    });
  }

  getReports() {
    this.currentPage = this.getPageLocalStorage();
    this.admin.getResports().subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        this.reports = data;
        console.log(this.reports);
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
      },
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/auth']);
        }
      },
      complete: () => {},
    });
  }

  getVariables() {
    this.admin.getVariables().subscribe({
      next: (data: variable[]) => {
        this.listOfVariables = data;
        setTimeout(() => this.cdr.detectChanges());
      },
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/auth']);
        }
      },
      complete: () => {},
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
    this.data.editar = true;
    this.router.navigate([
      'admin/dashboard/reportes/creacion-de-reportes/add-mod-report',
      this.report.id,
    ]);
  }

  // esta funcion permite duplicar el reporte seleccionado

  duplicated(rep: any) {
    this.report = rep;
    this.data.editar = true;
    this.data.flagDuplicated = true;
    let repD = this.reports.filter((res: any) => {
      return res.nombre === rep.nombre + ' duplicado ';
    });
    this.data.cantDuplicated = repD.length;
    this.router.navigate([
      'admin/dashboard/reportes/creacion-de-reportes/add-mod-report',
      this.report.id,
    ]);
  }

  create() {
    this.data.editar = false;
    this.router.navigate([
      'admin/dashboard/reportes/creacion-de-reportes/add-mod-report',
    ]);
  }

  //para paginación----
  pageToShow(page: number, list: Report[]) {
    this.setPageLocalStorage(page);
    this.listLenght = list.length;
    this.quantityOfPages = Math.ceil(this.listLenght / this.itemsPerPage);
    this.listCurrentPage = [];
    if (page <= 1) {
      this.listCurrentPage = list.slice(0, 10);
      this.listOfReport_toShow.next(this.listCurrentPage);
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
      this.listOfReport_toShow.next(this.listCurrentPage);
      this.initialItem = page * this.itemsPerPage - this.itemsPerPage + 1;
      this.finalItem =
        page * this.itemsPerPage -
        this.itemsPerPage +
        this.listCurrentPage.length;
    } else if (page >= this.quantityOfPages) {
      this.listCurrentPage = list.slice(
        this.quantityOfPages * this.itemsPerPage - this.itemsPerPage
      );
      this.listOfReport_toShow.next(this.listCurrentPage);
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
      this.pageToShow(this.currentPage, this.reports);
    } else {
      this.currentPage = 1;
      this.pageToShow(this.currentPage, this.reports);
    }
  }
  onClickAfter() {
    if (this.currentPage < this.quantityOfPages) {
      this.currentPage++;
      this.pageToShow(this.currentPage, this.reports);
    } else {
      this.currentPage = this.quantityOfPages;
      this.pageToShow(this.currentPage, this.reports);
    }
  }
  setPageLocalStorage(page: number) {
    localStorage.setItem('reportPage', JSON.stringify(page));
  }
  getPageLocalStorage(): number {
    let pageLocalStorage: number = 1;
    let pageLocalStorageJSON = localStorage.getItem('reportPage');
    if (pageLocalStorageJSON) {
      pageLocalStorage = JSON.parse(pageLocalStorageJSON);
    }
    return pageLocalStorage;
  }
  //
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
