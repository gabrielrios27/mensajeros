import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { axes, flag } from '../../models';
import { AdminService } from '../../services';

@Component({
  selector: 'app-axes',
  templateUrl: './axes.component.html',
  styleUrls: ['axes.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AxesComponent implements OnInit, OnDestroy {
  newOrEditedAxe: axes = {} as axes;
  flagEdited: boolean = false;
  flagNew: boolean = false;
  flagDelete: boolean = false;
  idToDelete: number = 0;

  listOfAxes: axes[] = [];
  listOfAxes_toSearch: axes[] = [];
  listOfAxes_toShow = new BehaviorSubject<axes[]>([]);
  itemSearch: string = '';
  toSearch: string = '';
  toSearchPrevius: string = '';
  twoParts: Boolean = false;

  isAxeInList = false;
  // pagination
  listLenght: number = 0;
  itemsPerPage: number = 10;
  quantityOfPages: number = 1;
  currentPage: number = 1;
  listCurrentPage: axes[] = {} as axes[];
  initialItem: number = 1;
  finalItem: number = 10;
  // suscripciones
  onDestroy$: Subject<boolean> = new Subject();

  constructor(
    private _snackBar: MatSnackBar,
    private _adminSvc: AdminService,
    private _cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAxesList();
    this.getAxeLocalStorage();
  }

  getAxesList() {
    this.currentPage = this.getPageLocalStorage();
    this._adminSvc
      .getAxes()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: axes[]) => {
          this.listOfAxes = data;
          setTimeout(() => this._cdr.detectChanges());
          this.pageToShow(this.currentPage, this.listOfAxes); //para paginación
        },
        error: (err) => {
          if (err.status === 401) {
            this.router.navigate(['/auth']);
          }
        },
        complete: () => {
        },
      });
  }
  //para paginación----
  pageToShow(page: number, list: axes[]) {
    this.setPageLocalStorage(page);
    this.listLenght = list.length;
    this.quantityOfPages = Math.ceil(this.listLenght / this.itemsPerPage);
    this.listCurrentPage = [];
    if (page <= 1) {
      this.listCurrentPage = list.slice(0, 10);
      this.listOfAxes_toShow.next(this.listCurrentPage);
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
      this.listOfAxes_toShow.next(this.listCurrentPage);
      this.initialItem = page * this.itemsPerPage - this.itemsPerPage + 1;
      this.finalItem =
        page * this.itemsPerPage -
        this.itemsPerPage +
        this.listCurrentPage.length;
    } else if (page >= this.quantityOfPages) {
      this.listCurrentPage = list.slice(
        this.quantityOfPages * this.itemsPerPage - this.itemsPerPage
      );
      this.listOfAxes_toShow.next(this.listCurrentPage);
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
      this.pageToShow(this.currentPage, this.listOfAxes);
    } else {
      this.currentPage = 1;
      this.pageToShow(this.currentPage, this.listOfAxes);
    }
  }
  onClickAfter() {
    if (this.currentPage < this.quantityOfPages) {
      this.currentPage++;
      this.pageToShow(this.currentPage, this.listOfAxes);
    } else {
      this.currentPage = this.quantityOfPages;
      this.pageToShow(this.currentPage, this.listOfAxes);
    }
  }
  setPageLocalStorage(page: number) {
    localStorage.setItem('axePage', JSON.stringify(page));
  }
  getPageLocalStorage(): number {
    let pageLocalStorage: number = 1;
    let pageLocalStorageJSON = localStorage.getItem('axePage');
    if (pageLocalStorageJSON) {
      pageLocalStorage = JSON.parse(pageLocalStorageJSON);
    }
    return pageLocalStorage;
  }
  //--------------------------------------------
  onClickDelete(id: number) {
    this.flagDelete = true;
    this.idToDelete = id;
  }
  deleteAxe(id: number) {
    this.flagDelete = false;
    this.listOfAxes_toSearch = [];
    for (let item of this.listOfAxes) {
      if (item.id !== id) {
        this.listOfAxes_toSearch.push(item);
      }
    }
    this.listOfAxes = this.listOfAxes_toSearch;

    this.pageToShow(this.currentPage, this.listOfAxes); //para paginación

    this._adminSvc
      .deleteAxeWithId(id.toString())
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: axes[]) => {
        },
        error: (err) => {
          if (err.status === 401) {
            this.router.navigate(['/auth']);
          }
        },
        complete: () => {
          this.getAxesList();
        },
      });
  }
  getAxeLocalStorage() {
    let newOrEditedAxeStr = localStorage.getItem('newOrEditedAxe');
    if (newOrEditedAxeStr) {
      this.newOrEditedAxe = JSON.parse(newOrEditedAxeStr);
      setTimeout(() => {
        this.close();
      }, 3000);
    }

    let isNewAxeStr = localStorage.getItem('isNewAxe');
    let isNewAxe;
    if (isNewAxeStr) {
      isNewAxe = JSON.parse(isNewAxeStr);
    }
    if (newOrEditedAxeStr) {
      if (isNewAxe) {
        this.flagNew = true;
        localStorage.removeItem('isNewAxe');
      } else {
        this.flagEdited = true;
      }
      localStorage.removeItem('newOrEditedAxe');
    }
  }
  Search(e: string) {
    /*informacion a buscar*/
    this.toSearch = e.toUpperCase();
    this.listOfAxes_toSearch = [];

    for (let item of this.listOfAxes) {
      if (item.nombre.toUpperCase().includes(this.toSearch)) {
        /*si el item incluye la cadena de texto a buscar entonces se guarda en el nuevo arreglo */
        this.listOfAxes_toSearch.push(item);
        this.twoParts = false;
      }
    }
    if (e !== '') {
      /*si el input no esta vacio se muestra el arreglo de ejes que coinciden con la busqueda*/
      this.TwoPartsSearch();
    } else {
      /*si el input esta vacio se muestra el arreglo de todos los ejes*/
      this.pageToShow(this.currentPage, this.listOfAxes); //para paginación
    }
  }

  /*TwoPartsSearch: cuando no hay coincidencias con lo escrito en el input entonces este valor(del input,toSearch) se divide en dos desde la ultima coincidencia y se buscan ambas partes en el arreglo de ejes */
  TwoPartsSearch() {
    if (this.listOfAxes_toSearch.length == 0 || this.twoParts) {
      this.twoParts = true;
      let toSearchPreviusLength = this.toSearchPrevius.length;
      let toSearchOne: string = this.toSearchPrevius;
      let toSearchTwo: string = this.toSearch.substring(toSearchPreviusLength);

      for (let item of this.listOfAxes) {
        if (
          item.nombre.toUpperCase().includes(toSearchOne) &&
          item.nombre.toUpperCase().includes(toSearchTwo)
        ) {
          /*si el eje incluye las cadenas de texto a buscar entonces se guarda en el arreglo */
          this.listOfAxes_toSearch.push(item);
        }
      }
      this.listOfAxes_toShow.next(this.listOfAxes_toSearch);
    } else {
      this.twoParts = false;
      this.listOfAxes_toShow.next(this.listOfAxes_toSearch);
      this.toSearchPrevius =
        this.toSearch; /*se guarda la ultima palabra buscada con la que hubo coincidencias */
    }
  }

  close() {
    this.flagNew = false;
    this.flagEdited = false;
    this.flagDelete = false;
  }
  ngOnDestroy() {
    this.onDestroy$.next(true);
  }
}
