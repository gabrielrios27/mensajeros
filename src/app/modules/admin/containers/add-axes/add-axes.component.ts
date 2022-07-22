import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { axes } from '../../models';
import { AdminService } from '../../services';

const ELEMENT_DATA: axes[] = [
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
  selector: 'app-add-axes',
  templateUrl: './add-axes.component.html',
  styleUrls: ['./add-axes.component.scss'],
})
export class AddAxesComponent implements OnInit {
  newAxe: FormGroup = this.fb.group({
    axe: [, [Validators.required]],
  });

  axeById: axes;
  idAxe: number;
  axeInput: string = '';

  listOfAxes: axes[] = [];
  isInList: boolean = false;
  // centerList: string[] = [
  //   'Hogar Colibríes',
  //   'San Jose',
  //   'Club de Día',
  //   'Centro la Balsa',
  //   'Centro la Balsa',
  //   'Centro la Balsa',
  // ];
  invalidForm: boolean = false;
  // suscripciones
  onDestroy$: Subject<boolean> = new Subject();
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private _adminSvc: AdminService,
    private _snackBar: MatSnackBar
  ) {
    this.idAxe = 0;
    this.axeById = {} as axes;
  }

  ngOnInit(): void {
    this.idAxe = this.getIdFromRute();
    console.log('id ruta:' + this.idAxe);
    this.completeInputWithAxe(this.idAxe);
    this.getAxesList();
  }
  onConfirm() {
    if (this.newAxe.invalid) {
      this.invalidForm = true;
      return;
    } else {
      this.invalidForm = false;
      this.isInList = this.checkInAxesList(this.newAxe.get('axe')?.value);
      if (this.isInList) {
        this._snackBar.open('¡El Eje ya existe en el sistema!', 'CERRAR', {
          duration: 3000,
        });
      } else {
        console.log(this.newAxe);
        this.setAxeLocStg(true);
        this.putOrAddAxe();
        this.router.navigate(['admin/dashboard/ejes']);
      }
    }
  }
  putOrAddAxe() {
    if (this.idAxe === 0) {
      console.log('nuevo eje');
    } else {
      let axeToEdit = { nombre: this.newAxe.get('axe')?.value };

      this._adminSvc.editAxeWithId(this.idAxe.toString(), axeToEdit).subscribe({
        next: (data: axes) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('Request trending complete');
        },
      });
    }
  }
  onChangeInput(e: string) {
    if (e.length !== 0) {
      this.invalidForm = false;
    }
  }
  setAxeLocStg(data: boolean) {
    localStorage.setItem('isNewAxe', JSON.stringify(data));
  }
  getIdFromRute(): number {
    let idToShow;
    this.rutaActiva.paramMap
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((params: ParamMap) => {
        idToShow = params.get('id');
      });
    return Number(idToShow);
  }
  getAxeById(id: number) {
    this._adminSvc.getAxeWithId(id.toString()).subscribe({
      next: (data: axes) => {
        this.axeById = data;
        console.log(this.axeById);
        this.axeInput = data.nombre;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Request trending complete');
      },
    });
  }
  completeInputWithAxe(id: number) {
    if (this.idAxe !== 0) {
      this.getAxeById(id);
    }
  }
  getAxesList() {
    this._adminSvc.getAxes().subscribe({
      next: (data: axes[]) => {
        this.listOfAxes = data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Request trending complete');
      },
    });
  }
  checkInAxesList(axe: string): boolean {
    for (let item of this.listOfAxes) {
      if (item.nombre.toUpperCase() === axe.toUpperCase()) {
        return true;
      }
    }
    return false;
  }
}
