import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { axes } from '../../models';
import { AdminService } from '../../services';

export interface PeriodicElement {
  nombre: string;
  id: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 123,
    nombre: 'Educacion',
  },
  {
    id: 34,
    nombre: 'Salud',
  },
  {
    id: 454,
    nombre: 'Eje 3',
  },
];

@Component({
  selector: 'app-axes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './axes.component.html',
  styleUrls: ['axes.component.scss'],
})
export class AxesComponent implements OnInit {
  displayedColumns: string[] = ['eje', 'centro', 'acciones'];
  // listOfAxes = ELEMENT_DATA;
  isNewAxe: string | null = null;

  listOfAxes: axes[] = [];
  listOfAxes_toSearch: axes[] = [];
  listOfAxes_toShow: axes[] = [];
  itemSearch: string = '';
  toSearch: string = '';
  toSearchPrevius: string = '';
  twoParts: Boolean = false;

  constructor(
    private _snackBar: MatSnackBar,
    private _adminSvc: AdminService
  ) {}

  ngOnInit() {
    this.getAxesList();
    this.getAxeLocalStorage();
    this.listOfAxes_toShow = this.listOfAxes;
  }
  getAxesList() {
    this._adminSvc.getAxes().subscribe({
      next: (data: axes[]) => {
        this.listOfAxes = data;
        console.log(this.listOfAxes);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Request trending complete');
      },
    });
  }

  getAxeLocalStorage() {
    this.isNewAxe = localStorage.getItem('isNewAxe');
    if (this.isNewAxe) {
      this._snackBar.open('¡El Eje fue creado con éxito!', 'CERRAR', {
        duration: 3000,
      });
      localStorage.removeItem('isNewAxe');
    }
  }

  /*para buscar la informacion del input dentro de las cards mostradas en el home*/
  Search(e: string) {
    /*informacion a buscar, que viene desde el componente searcher*/
    this.toSearch = e.toUpperCase();

    /*vacío el arreglo en donde guardaremos las peliculas que coincidan con la busqueda */
    this.listOfAxes_toSearch = [];

    for (let item of this.listOfAxes) {
      if (item.nombre.toUpperCase().includes(this.toSearch)) {
        /*si la pelicula incluye la cadena de texto a buscar entonces se guarda en el nuevo arreglo */
        this.listOfAxes_toSearch.push(item);
        this.twoParts = false;
      }
    }
    if (e !== '') {
      /*si el input no esta vacio se muestra el arreglo de peliculas que coinciden con la busqueda*/
      this.TwoPartsSearch();
    } else {
      /*si el input esta vacio se muestra el arreglo de todas las peliculas*/
      this.listOfAxes_toShow = this.listOfAxes;
    }
  }

  /*TwoPartsSearch: cuando no hay coincidencias con lo escrito en el input entonces este valor(del input,toSearch) se divide en dos desde la ultima coincidencia y se buscan ambas partes en el arreglo de peliculas y series */
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
          /*si la pelicula incluye las cadenas de texto a buscar entonces se guarda en el arreglo */
          this.listOfAxes_toSearch.push(item);
        }
      }
      this.listOfAxes_toShow = this.listOfAxes_toSearch;
    } else {
      this.twoParts = false;
      this.listOfAxes_toShow = this.listOfAxes_toSearch;
      this.toSearchPrevius =
        this.toSearch; /*se guarda la ultima palabra buscada con la que hubo coincidencias */
    }
  }
}
