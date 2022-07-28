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
      this.flagError = true;
      this.invalidForm = true;
      this.flagTimeOut = true;
      this.timerId = setTimeout(() => {
        this.close();
      }, 4000);
      return;
    } else {
      this.invalidForm = false;
      this.isInList = this.checkInAxesList(this.newAxe.get('axe')?.value);
      if (this.isInList) {
        this.flagExist = true;
        this.flagTimeOutExist = true;
        this.timerIdExist = setTimeout(() => {
          this.close();
        }, 4000);
      } else {
        this.putOrAddAxe();
        this.router.navigate(['admin/dashboard/ejes']);
      }
    }
  }
  putOrAddAxe() {
    if (this.idAxe === 0) {
      let axeToCreate: axes = { nombre: this.newAxe.get('axe')?.value, id: 0 };
      this.setAxeLocStg(axeToCreate, true);
      this._adminSvc.createAxe(axeToCreate).subscribe({
        next: (data: axes) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
          if (err.status === 401) {
            this.router.navigate(['/auth']);
          }
        },
        complete: () => {
          console.log('Request new axe complete');
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
          console.log(data);
        },
        error: (err) => {
          console.log(err);
          if (err.status === 401) {
            this.router.navigate(['/auth']);
          }
        },
        complete: () => {
          console.log('Request edit axe complete');
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
        console.log(this.axeById);
        this.axeInput = data.nombre;
      },
      error: (err) => {
        console.log(err);
        if (err.status === 401) {
          this.router.navigate(['/auth']);
        }
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
        if (err.status === 401) {
          this.router.navigate(['/auth']);
        }
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
