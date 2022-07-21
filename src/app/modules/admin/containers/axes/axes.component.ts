import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface PeriodicElement {
  centro: string;
  eje: string;
  acciones: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    eje: 'Salud',
    centro: 'Hogar San José',
    acciones: { edit: '/agregar-eje', delete: 'id' },
  },
  {
    eje: 'Educación',
    centro: 'Los Colibríes',
    acciones: { edit: '/agregar-eje', delete: 'id' },
  },
  {
    eje: 'Eje 3',
    centro: 'La balsa',
    acciones: { edit: '/agregar-eje', delete: 'id' },
  },
  {
    eje: 'Eje 4',
    centro: 'Hogar San José, La Balsa',
    acciones: { edit: '/agregar-eje', delete: 'id' },
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
  listOfAxes = ELEMENT_DATA;
  isNewAxe: string | null = null;

  // listOfAxes: any[] = [];
  listOfAxes_toSearch: any[] = [];
  listOfAxes_toShow: any[] = [];
  itemSearch: string = '';
  toSearch: string = '';
  toSearchPrevius: string = '';
  twoParts: Boolean = false;

  constructor(private _snackBar: MatSnackBar) {}
  ngOnInit() {
    this.getAxeLocalStorage();
    this.listOfAxes_toShow = this.listOfAxes;
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
      if (item.eje.toUpperCase().includes(this.toSearch)) {
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
          item.eje.toUpperCase().includes(toSearchOne) &&
          item.eje.toUpperCase().includes(toSearchTwo)
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
