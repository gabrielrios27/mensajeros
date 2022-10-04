import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { AxeWithquantity, variable } from '../../models';
import { AdminService } from '../../services';

@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.scss'],
})
export class VariablesComponent implements OnInit {
  newOrEditedVariable: AxeWithquantity = {} as AxeWithquantity;
  flagEdited: boolean = false;
  flagNew: boolean = false;
  flagDelete: boolean = false;
  idToDelete: number = 0;

  listOfVariables: AxeWithquantity[] = [];
  listOfVariables_toSearch: AxeWithquantity[] = [];
  listOfVariables_toShow = new BehaviorSubject<AxeWithquantity[]>([]);
  itemSearch: string = '';
  toSearch: string = '';
  toSearchPrevius: string = '';
  twoParts: Boolean = false;

  // pagination
  listLenght: number = 0;
  itemsPerPage: number = 10;
  quantityOfPages: number = 1;
  currentPage: number = 1;
  listCurrentPage: AxeWithquantity[] = {} as AxeWithquantity[];
  initialItem: number = 1;
  finalItem: number = 10;
  // suscripciones
  onDestroy$: Subject<boolean> = new Subject();

  constructor(
    private _adminSvc: AdminService,
    private _cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.getVariablesList();
  }
  getVariablesList() {
    this.currentPage = this.getPageLocalStorage();
    this._adminSvc
      .getVariablesQuantityPerAxe()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: AxeWithquantity[]) => {
          this.listOfVariables = data;
          setTimeout(() => this._cdr.detectChanges());
          this.pageToShow(this.currentPage, this.listOfVariables); //para paginación
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
  pageToShow(page: number, list: AxeWithquantity[]) {
    this.setPageLocalStorage(page);
    this.listLenght = list.length;
    this.quantityOfPages = Math.ceil(this.listLenght / this.itemsPerPage);
    this.listCurrentPage = [];
    if (page <= 1) {
      this.listCurrentPage = list.slice(0, 10);
      this.listOfVariables_toShow.next(this.listCurrentPage);
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
      this.listOfVariables_toShow.next(this.listCurrentPage);
      this.initialItem = page * this.itemsPerPage - this.itemsPerPage + 1;
      this.finalItem =
        page * this.itemsPerPage -
        this.itemsPerPage +
        this.listCurrentPage.length;
    } else if (page >= this.quantityOfPages) {
      this.listCurrentPage = list.slice(
        this.quantityOfPages * this.itemsPerPage - this.itemsPerPage
      );
      this.listOfVariables_toShow.next(this.listCurrentPage);
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
      this.pageToShow(this.currentPage, this.listOfVariables);
    } else {
      this.currentPage = 1;
      this.pageToShow(this.currentPage, this.listOfVariables);
    }
  }
  onClickAfter() {
    if (this.currentPage < this.quantityOfPages) {
      this.currentPage++;
      this.pageToShow(this.currentPage, this.listOfVariables);
    } else {
      this.currentPage = this.quantityOfPages;
      this.pageToShow(this.currentPage, this.listOfVariables);
    }
  }
  setPageLocalStorage(page: number) {
    localStorage.setItem('axeWithVariablesPage', JSON.stringify(page));
  }
  setNameAxeLocalStorage(name: string) {
    localStorage.setItem('nameAxeGroup', JSON.stringify(name));
  }
  getPageLocalStorage(): number {
    let pageLocalStorage: number = 1;
    let pageLocalStorageJSON = localStorage.getItem('axeWithVariablesPage');
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
    this.listOfVariables_toSearch = [];

    for (let item of this.listOfVariables) {
      if (item.nombre.toUpperCase().includes(this.toSearch)) {
        /*si el item incluye la cadena de texto a buscar entonces se guarda en el nuevo arreglo */
        this.listOfVariables_toSearch.push(item);
        this.twoParts = false;
      }
    }
    if (e !== '') {
      /*si el input no esta vacio se muestra el arreglo de ejes que coinciden con la busqueda*/
      this.TwoPartsSearch();
    } else {
      /*si el input esta vacio se muestra el arreglo de todos los ejes*/
      this.pageToShow(this.currentPage, this.listOfVariables); //para paginación
    }
  }

  /*TwoPartsSearch: cuando no hay coincidencias con lo escrito en el input entonces este valor(del input,toSearch) se divide en dos desde la ultima coincidencia y se buscan ambas partes en el arreglo de ejes */
  TwoPartsSearch() {
    if (this.listOfVariables_toSearch.length == 0 || this.twoParts) {
      this.twoParts = true;
      let toSearchPreviusLength = this.toSearchPrevius.length;
      let toSearchOne: string = this.toSearchPrevius;
      let toSearchTwo: string = this.toSearch.substring(toSearchPreviusLength);

      for (let item of this.listOfVariables) {
        if (
          item.nombre.toUpperCase().includes(toSearchOne) &&
          item.nombre.toUpperCase().includes(toSearchTwo)
        ) {
          /*si el eje incluye las cadenas de texto a buscar entonces se guarda en el arreglo */
          this.listOfVariables_toSearch.push(item);
        }
      }
      this.listOfVariables_toShow.next(this.listOfVariables_toSearch);
    } else {
      this.twoParts = false;
      this.listOfVariables_toShow.next(this.listOfVariables_toSearch);
      this.toSearchPrevius =
        this.toSearch; /*se guarda la ultima palabra buscada con la que hubo coincidencias */
    }
  }
  //para cerrar modales------------------
  close() {
    this.flagNew = false;
    this.flagEdited = false;
    this.flagDelete = false;
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
  }
}
