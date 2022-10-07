import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Centro } from '../../models/centro';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-centers',
  templateUrl: './centers.component.html',
  styleUrls: ['centers.component.scss'],
})
export class CentersComponent implements OnInit {
  Centro: any;
  centro: any;
  editar: boolean = false;
  centros: Array<Centro> = new Array();
  flagEdited: boolean = false;
  flagNew: boolean = false;
  flagDelete: boolean = false;
  idToDelete: number = 0;
  newOrEditedCenter: Centro = {} as Centro;
  // pagination
  centrosListComplete: Array<Centro> = new Array();
  listLenght: number = 0;
  itemsPerPage: number = 10;
  quantityOfPages: number = 1;
  currentPage: number = 1;
  listCurrentPage: Array<Centro> = new Array();
  initialItem: number = 1;
  finalItem: number = 10;
  flagCreatedReport: boolean;
  modalText: string =
    '¡Informe creado con éxito!<br>Podrás encontrar el Centro de Informes Comparativos en la sección Centros.';

  constructor(
    private router: Router,
    public data: DataService,
    private admin: AdminService,
    private cdr: ChangeDetectorRef
  ) {
    this.flagCreatedReport = false;
  }
  ngOnInit() {
    this.getFlagCreatedComparativeReport();
    this.getCenters();
    this.getCenterLocalStorage();
  }
  getFlagCreatedComparativeReport() {
    let flagStr = sessionStorage.getItem('createdComparativeReport');
    if (flagStr) {
      this.flagCreatedReport = JSON.parse(flagStr);
      setTimeout(() => {
        this.close();
      }, 3000);
    }
    sessionStorage.removeItem('createdComparativeReport');
  }
  busca(e: string) {
    if (e.toLocaleLowerCase() == '') {
      this.ngOnInit();
    } else {
      this.centros = this.centros.filter((res) => {
        return res.nombre.toLowerCase().match(this.Centro.toLowerCase());
      });
    }
  }

  create() {
    this.router.navigate(['admin/dashboard/centros/add-mod-center']);
  }

  edit(center: Centro) {
    this.editar = true;
    this.router.navigate(['admin/dashboard/centros/add-mod-center']);
    this.data.center = center;
    this.data.editar = true;
  }

  getCenters() {
    this.currentPage = this.getPageLocalStorage();
    this.admin.getCentros().subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        this.centrosListComplete = data;
        this.pageToShow(this.currentPage, this.centrosListComplete); //para paginación
      },
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/auth']);
        }
      },
    });
  }
  //para paginación----
  pageToShow(page: number, list: Centro[]) {
    this.setPageLocalStorage(page);
    this.listLenght = list.length;
    this.quantityOfPages = Math.ceil(this.listLenght / this.itemsPerPage);
    this.listCurrentPage = [];
    if (page <= 1) {
      this.listCurrentPage = list.slice(0, 10);
      this.centros = this.listCurrentPage;
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
      this.centros = this.listCurrentPage;
      this.initialItem = page * this.itemsPerPage - this.itemsPerPage + 1;
      this.finalItem =
        page * this.itemsPerPage -
        this.itemsPerPage +
        this.listCurrentPage.length;
    } else if (page >= this.quantityOfPages) {
      this.listCurrentPage = list.slice(
        this.quantityOfPages * this.itemsPerPage - this.itemsPerPage
      );
      this.centros = this.listCurrentPage;
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
      this.pageToShow(this.currentPage, this.centrosListComplete);
    } else {
      this.currentPage = 1;
      this.pageToShow(this.currentPage, this.centrosListComplete);
    }
  }
  onClickAfter() {
    if (this.currentPage < this.quantityOfPages) {
      this.currentPage++;
      this.pageToShow(this.currentPage, this.centrosListComplete);
    } else {
      this.currentPage = this.quantityOfPages;
      this.pageToShow(this.currentPage, this.centrosListComplete);
    }
  }
  setPageLocalStorage(page: number) {
    localStorage.setItem('centerPage', JSON.stringify(page));
  }
  getPageLocalStorage(): number {
    let pageLocalStorage: number = 1;
    let pageLocalStorageJSON = localStorage.getItem('centerPage');
    if (pageLocalStorageJSON) {
      pageLocalStorage = JSON.parse(pageLocalStorageJSON);
    }
    return pageLocalStorage;
  }
  //--------------------------------------------
  getCenter() {
    this.admin.getUsers().subscribe({
      next: (res: any) => {
        this.centro = res;
        setTimeout(() => this.cdr.detectChanges());
      },
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/auth']);
        }
      },
    });
  }

  onClickDelete(id: number) {
    this.flagDelete = true;
    this.idToDelete = id;
  }

  delete() {
    this.admin.deleteCenter(this.idToDelete).subscribe({
      next: (data: any) => {
        setTimeout(() => this.cdr.detectChanges());
        this.getCenters();
        this.close();
      },
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/auth']);
        }
      },
    });
  }

  elim(c: Centro) {
    this.idToDelete = c.id;
    this.flagDelete = true;
  }

  createCompareReports(idCenter: number) {
    this.router.navigate([
      'admin/dashboard/centros/crear-informe-comparativo/' + idCenter,
    ]);
  }
  viewComparisonReport(idCenter: number) {
    this.router.navigate([
      'admin/dashboard/centros/ver-informes-comparativo/' + idCenter,
    ]);
  }
  getCenterLocalStorage() {
    let newOrEditedCenter = localStorage.getItem('newOrEditedCenter');
    if (newOrEditedCenter) {
      setTimeout(() => {
        this.close();
      }, 3000);
    }

    let isNewCenterStr = localStorage.getItem('isNewCenter');
    let isNewCenter;
    if (isNewCenterStr) {
      isNewCenter = JSON.parse(isNewCenterStr);
    }
    if (newOrEditedCenter) {
      if (isNewCenter) {
        this.flagNew = true;
        localStorage.removeItem('isNewCenter');
      } else {
        this.flagEdited = true;
      }
      localStorage.removeItem('newOrEditedCenter');
    }
  }

  close() {
    this.flagNew = false;
    this.flagEdited = false;
    this.flagDelete = false;
    this.flagCreatedReport = false;
  }
}
