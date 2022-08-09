import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { axes, variable } from '../../models';
import { AdminService } from '../../services';

interface Animal {
  name: string;
  sound: string;
}
@Component({
  selector: 'app-add-variables',
  templateUrl: './add-variables.component.html',
  styleUrls: ['./add-variables.component.scss'],
})
export class AddVariablesComponent implements OnInit {
  newVariable: FormGroup = this.fb.group({
    variable: [, [Validators.required]],
  });

  variableById: variable;
  idVariable: number;
  variableInput: string = '';
  descriptionInput: string = '';

  listOfVariable: variable[] = [];
  isInList: boolean = false;
  flagError: boolean = false;
  flagExist: boolean = false;

  flagTimeOut: boolean = false;
  flagTimeOutExist: boolean = false;
  timerId: any = 0;
  timerIdExist: any = 0;

  invalidForm: boolean = false;
  // para paginacion de variable
  itemsPerPage: number = 10;
  quantityOfPages: number = 1;
  //centro asignado
  centroAsignado: any;
  //radio button tipo de respuesta
  typeAnswer: string = '';
  typeOfAnswer: string[] = ['Numérico', 'Textual'];
  typeOfAnswerNumber: string = 'Numérico';
  typeOfAnswerText: string = 'Textual';
  //checkbox agregar a variable
  addToVariable: string = '';
  // suscripciones
  onDestroy$: Subject<boolean> = new Subject();
  //para escala de valor

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private _adminSvc: AdminService
  ) {
    this.idVariable = 0;
    this.variableById = {} as variable;
  }
  ejeControl = new FormControl(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  axesList: axes[] = [
    { nombre: 'ACOMPAÑAMIENTO EN SALUD', id: 1 },
    {
      nombre: 'SEGURIDAD NUTRICIONAL',
      id: 2,
    },
    {
      nombre: 'ACOMPAÑAMIENTO EDUCATIVO',
      id: 3,
    },
    {
      nombre: 'GENERAL',
      id: 4,
    },
  ];
  ngOnInit(): void {
    this.idVariable = this.getIdFromRute();
    console.log('id ruta:' + this.idVariable);
    this.completeInputWithVariable(this.idVariable);
    this.getVariableList();
  }
  onConfirm() {
    if (this.newVariable.invalid) {
      this.flagError = true;
      this.invalidForm = true;
      this.flagTimeOut = true;
      this.timerId = setTimeout(() => {
        this.close();
      }, 3000);
      return;
    } else {
      this.invalidForm = false;
      this.isInList = this.checkInVariableList(
        this.newVariable.get('variable')?.value
      );
      if (this.isInList) {
        //comprueba si esta en la lista, si esta se renderiza un mensaje de error(este eje ya se encuentra cargado)
        this.flagExist = true;
        this.flagTimeOutExist = true;
        this.timerIdExist = setTimeout(() => {
          this.close();
        }, 3000);
      } else {
        this.putOrAddVariable();
      }
    }
  }
  setPageLocalStorage() {
    //para paginación
    this.quantityOfPages = Math.ceil(
      (this.listOfVariable.length + 1) / this.itemsPerPage
    );
    localStorage.setItem('variablePage', JSON.stringify(this.quantityOfPages));
  }
  putOrAddVariable() {
    if (this.idVariable === 0) {
      let variableToCreate: variable = {
        nombre: this.newVariable.get('variable')?.value,
        id: 0,
      };
      this.setVariableLocStg(variableToCreate, true);
      this.setPageLocalStorage(); //para paginación
      this._adminSvc.createVariable(variableToCreate).subscribe({
        next: (data: variable) => {
          this.router.navigate(['admin/dashboard/variables']);
          console.log(data);
        },
        error: (err) => {
          console.log(err);
          if (err.status === 401) {
            this.router.navigate(['/auth']);
          }
        },
        complete: () => {
          console.log('Request new Variable complete');
        },
      });
    } else {
      let variableToEdit: variable = {
        nombre: this.newVariable.get('variable')?.value,
        id: this.idVariable,
      };
      this.setVariableLocStg(variableToEdit, false);
      this._adminSvc
        .editVariableWithId(this.idVariable.toString(), variableToEdit)
        .subscribe({
          next: (data: variable) => {
            this.router.navigate(['admin/dashboard/variables']);
            console.log(data);
          },
          error: (err) => {
            console.log(err);
            if (err.status === 401) {
              this.router.navigate(['/auth']);
            }
          },
          complete: () => {
            console.log('Request edit Variable complete');
          },
        });
    }
  }
  onChangeInput(e: string) {
    if (e.length !== 0) {
      this.invalidForm = false;
    }
  }
  setVariableLocStg(data: variable, isNewVariable: boolean) {
    localStorage.setItem('newOrEditedVariables', JSON.stringify(data));
    localStorage.setItem('isNewVariable', JSON.stringify(isNewVariable));
  }

  getIdFromRute(): number {
    let idToShow;
    this.rutaActiva.paramMap.subscribe((params: ParamMap) => {
      idToShow = params.get('id');
    });
    return Number(idToShow);
  }
  getVariableById(id: number) {
    this._adminSvc.getVariableWithId(id.toString()).subscribe({
      next: (data: variable) => {
        this.variableById = data;
        console.log(this.variableById);
        this.variableInput = data.nombre;
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
  completeInputWithVariable(id: number) {
    if (this.idVariable !== 0) {
      this.getVariableById(id);
    }
  }
  getVariableList() {
    this._adminSvc.getVariables().subscribe({
      next: (data: variable[]) => {
        this.listOfVariable = data;
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
  checkInVariableList(variable: string): boolean {
    for (let item of this.listOfVariable) {
      if (item.nombre.toUpperCase() === variable.toUpperCase()) {
        return true;
      }
    }
    return false;
  }
  capturarCentro(e: any) {
    this.centroAsignado = e;
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
