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
  //Para modal de advertencia de cambio de pantalla------------------
  flagAddEdit: boolean = false;
  showDialog = false;
  subject = new Subject<boolean>();

  variableById: variable;
  idVariable: number;
  variableInput: string = '';
  descriptionInput: string = '';
  //para id de eje desde donde se dio click a crear variable
  idAxeVariable: number;
  //para chekear si la variable ya existe.
  listOfVariable: variable[] = [];
  isInList: boolean = false;
  flagError: boolean = false;
  flagExist: boolean = false;
  //para modal de alerta de 'variable ya existe'
  flagTimeOut: boolean = false;
  flagTimeOutExist: boolean = false;
  timerId: any = 0;
  timerIdExist: any = 0;
  //para border input en alerta 'debe completar todos los campos'.
  invalidForm: boolean = false;
  // para paginacion de variable
  itemsPerPage: number = 10;
  quantityOfPages: number = 1;
  //eje asignado
  selectedAxe: axes = {} as axes;
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
  etiquetaInicial: string = '';
  etiquetaFinal: string = '';
  initialValuesList: number[] = [0, 1];

  finalsValuesListFromOne: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  finalsValuesListFromtwo: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  finalsValuesList: number[] = [];
  //Form
  newVariable: FormGroup = this.fb.group({
    nombre: [, [Validators.required]],
    descripcion: [],
    eje: [, [Validators.required]],
    tipo: [, [Validators.required]],
    genero: [false],
    escala_valor: [false],
    valor_inicial: [0],
    valor_final: [5],
    etiqueta_inicial: [, [Validators.required]],
    etiqueta_final: [, [Validators.required]],
  });
  //Para previsualización de variable
  flagPreview: boolean;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private _adminSvc: AdminService
  ) {
    this.idVariable = 0;
    this.idAxeVariable = 0;
    this.variableById = {} as variable;
    this.flagPreview = false;
  }
  ejeControl = new FormControl(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  axesList: axes[] = [];

  ngOnInit(): void {
    this.getAxesList();
    this.setFlagAddEdit(false); //Para colocar modal de advertencia de cambio de pantalla si se da click a item en navbar
    this.idVariable = this.getIdFromRute();

    console.log('id ruta:' + this.idVariable);
    this.completeInputWithVariable(this.idVariable);
    // this.getVariableList();
    this.finalsValuesList = this.finalsValuesListFromOne;
    this.newVariable.get('typeAnswerForm')?.setValue('Numérico');
    this.onSelectionChange();
    this.onSelectValueScale();
  }

  //obtiene la lista de ejes
  getAxesList() {
    this._adminSvc.getAxes().subscribe({
      next: (data: axes[]) => {
        this.axesList = data;
        this.getIdAxeFromRute(); //obtiene el id de eje de la ruta y renderiza el eje elegido en el select de eje
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
  //Para modal de advertencia de cambio de pantalla------------------
  setFlagAddEdit(value: boolean) {
    this.flagAddEdit = value;
    localStorage.setItem('flagAddEdit', JSON.stringify(this.flagAddEdit));
  }
  onSelection($event: any) {
    console.log('on selection en add variable', $event);
    this.showDialog = false;
    if ($event === 'ok') {
      this.subject.next(true);
      this.setFlagAddEdit(false);
    } else {
      this.subject.next(false);
    }
  }
  openDialog() {
    console.log('opn dialog');
    this.showDialog = true;
  }
  //Para preview de variable--------------------
  toggleFlagPreview(value: boolean) {
    this.flagPreview = value;
  }
  onGoOutPreview($event: boolean) {
    console.log('evento desde hijo: ', $event);
    this.toggleFlagPreview(!$event);
  }
  //click al botón de confirmar------------------
  onConfirm() {
    console.log('form: ', this.newVariable);
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
        this.newVariable.get('nombre')?.value
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
    console.log('variablePage en loc stg: ', this.quantityOfPages);
    localStorage.setItem('variablePage', JSON.stringify(this.quantityOfPages));
  }
  putOrAddVariable() {
    this.setFlagAddEdit(true); //Para quitar modal de advertencia de cambio de pantalla de navbar del btn confirm
    console.log('idvariable en put or add: ', this.idVariable);
    if (this.idVariable === 0) {
      let variableToCreate: variable = this.newVariable.value;
      if (!variableToCreate.escala_valor) {
        variableToCreate.valor_inicial = 'null';
        variableToCreate.valor_final = 'null';
        variableToCreate.etiqueta_inicial = 'null';
        variableToCreate.etiqueta_final = 'null';
      }
      console.log('variable a subir: ', variableToCreate);

      this.setVariableLocStg(variableToCreate, true); //sube a localStorage la variable creada y un flag que indica que es nueva variable para desplegar modal en página siguiente.
      this.setPageLocalStorage(); //para paginación
      this._adminSvc.createVariable(variableToCreate).subscribe({
        next: (data: variable) => {
          this.router.navigate([
            'admin/dashboard/variables/variables-agrupadas/' +
              variableToCreate.eje.id,
          ]); //navega hacia la ultima pagina de las variables agrupadas de el eje elegido
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
      let variableToEdit: variable = this.newVariable.value;
      if (!variableToEdit.escala_valor) {
        variableToEdit.valor_inicial = 'null';
        variableToEdit.valor_final = 'null';
        variableToEdit.etiqueta_inicial = 'null';
        variableToEdit.etiqueta_final = 'null';
      }
      console.log('variable a subir: ', variableToEdit);
      this.setVariableLocStg(variableToEdit, false); //sube a localStorage la variable editada y un flag que indica que es NO es nueva variable para desplegar modal adecuado en página siguiente.
      this._adminSvc
        .editVariableWithId(this.idVariable.toString(), variableToEdit)
        .subscribe({
          next: (data: variable) => {
            this.router.navigate([
              'admin/dashboard/variables/variables-agrupadas/' +
                variableToEdit.eje.id,
            ]); //navega hacia la ultima pagina de las variables agrupadas de el eje elegido
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
    localStorage.setItem('newOrEditedVariable', JSON.stringify(data));
    localStorage.setItem('isNewVariable', JSON.stringify(isNewVariable));
  }
  //OBTIENE EL ID DE LA VARIABLE EN LA RUTA
  getIdFromRute(): number {
    let idToShow;
    this.rutaActiva.paramMap.subscribe((params: ParamMap) => {
      idToShow = params.get('id');
    });
    return Number(idToShow);
  }
  //obtiene el id de eje de la ruta y renderiza el eje elegido en el select de eje
  getIdAxeFromRute() {
    let idAxeToShow;
    this.rutaActiva.paramMap.subscribe((params: ParamMap) => {
      idAxeToShow = Number(params.get('id-axe'));
      if (idAxeToShow !== 0) {
        for (let item of this.axesList) {
          if (item.id === idAxeToShow) {
            this.selectedAxe = item;
            this.getVariableList(); //obtiene la lista de variables de ese eje para chekear si el eje creado ya existe
          }
        }
      }
    });
  }
  //SI EL ID-variable DE RUTA ES DISTINTO DE CERO ENTONCES ES UNA VARIABLE A EDITAR Y LLAMA A METODO getVariableById
  completeInputWithVariable(id: number) {
    if (this.idVariable !== 0) {
      this.getVariableById(id);
    }
  }
  //USA EL ID-variable DE RUTA PARA OBTENER LA VARIABLE Y MOSTRAR EN FORM LA INFORMACION DE LA VARIABLE A MODIFICAR
  getVariableById(id: number) {
    this._adminSvc.getVariableWithId(id.toString()).subscribe({
      next: (data: variable) => {
        this.variableById = data;
        console.log(this.variableById);
        this.variableInput = data.nombre;
        this.descriptionInput = data.descripcion;
        this.typeAnswer = data.tipo;
        if (data.genero?.toLowerCase() === 'true') {
          this.addGenre = true;
          this.flagGenre = true;
        } else {
          this.addGenre = false;
          this.flagGenre = false;
        }
        if (data.escala_valor?.toLowerCase() === 'true') {
          this.addValueEscale = true;
          this.flagGenre = false;
          this.flagValueScale = true;
          this.firstValue = Number(data.valor_inicial);
          this.lastValue = Number(data.valor_final);
          this.newVariable.get('etiqueta_inicial')?.enable();
          this.newVariable.get('etiqueta_final')?.enable();
          if (data.etiqueta_inicial) {
            this.etiquetaInicial = data.etiqueta_inicial;
          }
          if (data.etiqueta_final) {
            this.etiquetaFinal = data.etiqueta_final;
          }
        } else {
          this.addValueEscale = false;
          this.flagGenre = true;
          this.flagValueScale = false;
          this.newVariable.get('etiqueta_inicial')?.disable();
          this.newVariable.get('etiqueta_final')?.disable();
        }
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

  //OBTIENE LA LISTA DE VARIABLES DEL EJE PARA LUEGO CHEKEAR SI LA VARIABLE YA EXISTE EN EL EJE-----------
  getVariableList() {
    this._adminSvc.getVariablesGroup(this.selectedAxe.id.toString()).subscribe({
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
  //CHEKEA SI LA VARIABLE YA EXISTE EN EL EJE-----------
  checkInVariableList(variable: string): boolean {
    console.log('nombre de variable a guardar: ', variable);
    console.log(
      'nombre de variable en variableById: ',
      this.variableById.nombre
    );

    for (let item of this.listOfVariable) {
      if (
        item.nombre.toUpperCase() === variable.toUpperCase() &&
        variable.toUpperCase() !== this.variableById.nombre.toLocaleUpperCase()
      ) {
        return true;
      }
    }
    return false;
  }
  //CAPTURA DATOS DE FORM------------------
  captureAxe(e: any) {
    this.selectedAxe = e;
    this.getVariableList();
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
      this.newVariable.get('etiqueta_inicial')?.disable();
      this.newVariable.get('etiqueta_final')?.disable();
    } else {
      this.flagValueScale = true;
      this.newVariable.get('etiqueta_inicial')?.enable();
      this.newVariable.get('etiqueta_final')?.enable();
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
