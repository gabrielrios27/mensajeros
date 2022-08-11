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
import { firstValueFrom, Subject } from 'rxjs';
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
  selectAxeControl = new FormControl(false);
  flagAddEdit: boolean = false;

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
  ejeAsignado: any;
  //radio button tipo de respuesta
  typeAnswer: string = 'Numérico';
  flagGenre: boolean = true;
  typeOfAnswerNumber: string = 'Numérico';
  typeOfAnswerText: string = 'Textual';
  //checkboxs agregar a variable
  addGenre: boolean = false;
  addValueEscale: boolean = false;
  // suscripciones
  onDestroy$: Subject<boolean> = new Subject();
  //para escala de valor
  flagValueScale: boolean = true;
  firstValue: number = 0;
  lastValue: number = 5;
  initialValuesList: number[] = [0, 1];

  finalsValuesListFromOne: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  finalsValuesListFromtwo: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  finalsValuesList: number[] = [];
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  newVariable: FormGroup = this.fb.group({
    variable: [, [Validators.required]],
    descriptionForm: [],
    selectAxeForm: [],
    typeAnswerForm: [],
    genreForm: [false],
    valueScaleForm: [false],
    firstNumberForm: [0],
    lastNumberForm: [5],
    firstValueForm: [, [Validators.required]],
    lastValueForm: [, [Validators.required]],
  });
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
    this.setFlagAddEdit(true); //Para modal de advertencia de cambio de pantalla
    this.idVariable = this.getIdFromRute();
    console.log('id ruta:' + this.idVariable);
    this.completeInputWithVariable(this.idVariable);
    this.getVariableList();
    this.finalsValuesList = this.finalsValuesListFromOne;
    this.newVariable.get('typeAnswerForm')?.setValue('Numérico');
    this.onSelectionChange();
    this.onSelectValueScale();
  }
  //Para modal de advertencia de cambio de pantalla------------------
  setFlagAddEdit(value: boolean) {
    this.flagAddEdit = value;
    localStorage.setItem('flagAddEdit', JSON.stringify(this.flagAddEdit));
  }
  //click al botón de confirmar------------------
  onConfirm() {
    this.setFlagAddEdit(false);
    console.log('form: ', this.newVariable);

    // if (this.newVariable.invalid) {
    //   this.flagError = true;
    //   this.invalidForm = true;
    //   this.flagTimeOut = true;
    //   this.timerId = setTimeout(() => {
    //     this.close();
    //   }, 3000);
    //   return;
    // } else {
    //   this.invalidForm = false;
    //   this.isInList = this.checkInVariableList(
    //     this.newVariable.get('variable')?.value
    //   );
    //   if (this.isInList) {
    //     //comprueba si esta en la lista, si esta se renderiza un mensaje de error(este eje ya se encuentra cargado)
    //     this.flagExist = true;
    //     this.flagTimeOutExist = true;
    //     this.timerIdExist = setTimeout(() => {
    //       this.close();
    //     }, 3000);
    //   } else {
    //     this.putOrAddVariable();
    //   }
    // }
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
        tipo: 'Numerico',
        descripcion: 'Aqui la descripción',
        eje: {
          id: 2,
          nombre: 'salud',
        },
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
        tipo: 'Numerico',
        descripcion: 'Aqui la descripción',
        eje: {
          id: 2,
          nombre: 'salud',
        },
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
    this._adminSvc.getVariablesQuantityPerAxe().subscribe({
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
  capturarEje(e: any) {
    this.ejeAsignado = e;
  }
  captureFirstValue(e: number) {
    this.firstValue = e;
    if (e === 1) {
      this.finalsValuesList = this.finalsValuesListFromtwo;
    } else {
      this.finalsValuesList = this.finalsValuesListFromOne;
    }
    console.log('firstValue: ', this.firstValue);
  }
  captureLastValue(e: number) {
    this.lastValue = e;
  }
  onSelectionChange() {
    if (this.typeAnswer === 'Numérico') {
      this.flagGenre = true;
      this.addValueEscale = false;
      this.onSelectValueScale();
    } else {
      this.flagGenre = false;
      this.addGenre = false;
    }
  }
  onSelectValueScale() {
    if (!this.addValueEscale) {
      this.flagValueScale = false;
      this.newVariable.get('firstValueForm')?.disable();
      this.newVariable.get('lastValueForm')?.disable();
    } else {
      this.flagValueScale = true;
      this.newVariable.get('firstValueForm')?.enable();
      this.newVariable.get('lastValueForm')?.enable();
    }
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
