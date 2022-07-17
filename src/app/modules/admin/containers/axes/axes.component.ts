import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface PeriodicElement {
  centro: string;
  eje: string;
  acciones: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { eje: 'Salud', centro: 'Hogar San José', acciones: 'H' },
  { eje: 'Educación', centro: 'Los Colibríes', acciones: 'He' },
  { eje: 'Eje 3', centro: 'Centro 3', acciones: 'Li' },
];

@Component({
  selector: 'app-axes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './axes.component.html',
  styleUrls: ['axes.component.scss'],
})
export class AxesComponent implements OnInit {
  displayedColumns: string[] = ['eje', 'centro', 'acciones'];
  dataSource = ELEMENT_DATA;
  isNewAxe: string | null = null;
  constructor(private _snackBar: MatSnackBar) {}
  ngOnInit() {
    this.getAxeLocalStorage();
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
}
