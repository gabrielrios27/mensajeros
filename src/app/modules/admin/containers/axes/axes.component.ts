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
  displayedColumns: string[] = ['eje', 'centro', 'acciones'];
  // listOfAxes = ELEMENT_DATA;
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
    this._adminSvc
      .getAxes()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: axes[]) => {
          this.listOfAxes = data;
          console.log(this.listOfAxes);
          this.listOfAxes_toShow.next(this.listOfAxes);
          setTimeout(() => this._cdr.detectChanges());
        },
        error: (err) => {
          console.log(err);
          if (err.status === 401) {
            this.router.navigate(['/auth']);
          }
        },
        complete: () => {
          console.log('Request get axes complete');
        },
      });
  }
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
    this.listOfAxes_toShow.next(this.listOfAxes_toSearch);
    this._adminSvc
      .deleteAxeWithId(id.toString())
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: axes[]) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
          if (err.status === 401) {
            this.router.navigate(['/auth']);
          }
        },
        complete: () => {
          console.log('Request delete complete');
          this.getAxesList();
        },
      });
  }
  getAxeLocalStorage() {
    let newOrEditedAxeStr = localStorage.getItem('newOrEditedAxe');
    if (newOrEditedAxeStr) {
      this.newOrEditedAxe = JSON.parse(newOrEditedAxeStr);
      this.checkAxeInList(this.newOrEditedAxe);
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
  checkAxeInList(axe: axes) {
    this.isAxeInList = false;
    if (axe.id === 0) {
      for (let item of this.listOfAxes) {
        if (item.nombre === axe.nombre) {
          this.isAxeInList = true;
        }
      }
    } else {
      for (let item of this.listOfAxes) {
        if (item.id === axe.id) {
          this.isAxeInList = true;
        }
      }
    }
    if (!this.isAxeInList) {
      this.listOfAxes.push(axe);
      this.listOfAxes_toShow.next(this.listOfAxes);
    }
    this.getAxesList();
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
      this.listOfAxes_toShow.next(this.listOfAxes);
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
