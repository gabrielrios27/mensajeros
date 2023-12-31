import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { axes } from '../../models';
import { AdminService } from '../../services';

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
  flagError: boolean = false;
  flagExist: boolean = false;

  flagTimeOut: boolean = false;
  flagTimeOutExist: boolean = false;
  timerId: any = 0;
  timerIdExist: any = 0;

  invalidForm: boolean = false;
  // para paginacion de axes
  itemsPerPage: number = 10;
  quantityOfPages: number = 1;

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
    this.completeInputWithAxe(this.idAxe);
    this.getAxesList();
  }
  onConfirm() {
    if (this.newAxe.invalid) {
      this.flagError = true;
      this.invalidForm = true;
      this.flagTimeOut = true;
      this.timerId = setTimeout(() => {
        this.close();
      }, 3000);
      return;
    } else {
      this.invalidForm = false;
      this.isInList = this.checkInAxesList(this.newAxe.get('axe')?.value);
      if (this.isInList) {
        //comprueba si esta en la lista, si esta se renderiza un mensaje de error(este eje ya se encuentra cargado)
        this.flagExist = true;
        this.flagTimeOutExist = true;
        this.timerIdExist = setTimeout(() => {
          this.close();
        }, 3000);
      } else {
        this.putOrAddAxe();
      }
    }
  }
  setPageLocalStorage() {
    //para paginación
    this.quantityOfPages = Math.ceil(
      (this.listOfAxes.length + 1) / this.itemsPerPage
    );
    localStorage.setItem('axePage', JSON.stringify(this.quantityOfPages));
  }
  putOrAddAxe() {
    if (this.idAxe === 0) {
      let axeToCreate: axes = { nombre: this.newAxe.get('axe')?.value, id: 0 };
      this.setAxeLocStg(axeToCreate, true);
      this.setPageLocalStorage(); //para paginación
      this._adminSvc.createAxe(axeToCreate).subscribe({
        next: (data: axes) => {
          this.router.navigate(['admin/dashboard/ejes']);
        },
        error: (err) => {
          if (err.status === 401) {
            this.router.navigate(['/auth']);
          }
        },
        complete: () => {
        },
      });
    } else {
      let axeToEdit: axes = {
        nombre: this.newAxe.get('axe')?.value,
        id: this.idAxe,
      };
      this.setAxeLocStg(axeToEdit, false);
      this._adminSvc.editAxeWithId(this.idAxe.toString(), axeToEdit).subscribe({
        next: (data: axes) => {
          this.router.navigate(['admin/dashboard/ejes']);
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
  }
  onChangeInput(e: string) {
    if (e.length !== 0) {
      this.invalidForm = false;
    }
  }
  setAxeLocStg(data: axes, isNewAxe: boolean) {
    localStorage.setItem('newOrEditedAxe', JSON.stringify(data));
    localStorage.setItem('isNewAxe', JSON.stringify(isNewAxe));
  }
  getIdFromRute(): number {
    let idToShow;
    this.rutaActiva.paramMap.subscribe((params: ParamMap) => {
      idToShow = params.get('id');
    });
    return Number(idToShow);
  }
  getAxeById(id: number) {
    this._adminSvc.getAxeWithId(id.toString()).subscribe({
      next: (data: axes) => {
        this.axeById = data;
        this.axeInput = data.nombre;
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
        if (err.status === 401) {
          this.router.navigate(['/auth']);
        }
      },
      complete: () => {
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
  close() {
    if (this.flagTimeOut) {
      clearTimeout(this.timerId);
    }
    this.flagError = false;
    if (this.flagTimeOutExist) {
      clearTimeout(this.timerIdExist);
    }
    this.flagExist = false;
  }
}
