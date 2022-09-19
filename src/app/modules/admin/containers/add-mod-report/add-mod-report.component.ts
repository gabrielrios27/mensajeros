import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subject, of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { axes, variable } from '../../models/admin.model';
import { Centro } from '../../models/centro';
import { Report } from '../../models/report';
import { DataService } from '../../services/data.service';
import { element } from 'protractor';

@Component({
  selector: 'app-add-mod-report',
  templateUrl: './add-mod-report.component.html',
  styleUrls: ['./add-mod-report.component.scss'],
})
export class AddModReportComponent implements OnInit {
  deliverdate: any;
  nombre: any;
  desde: any;
  hasta: any;
  id: any;
  variables: any;
  eje: any;
  today: any = new Date();
  arrayc: Array<number> = [1];
  arrayAxes: Array<any> = [];
  arrayVaribles: Array<any> = [];
  report: Report = {} as Report;
  centerSelects: Array<any> = [];
  axesSelects: Array<any> = [];
  variablesSelects: Array<variable> = [];
  listOfAxes: Array<axes> = [];
  listOfVariables: Array<variable> = [];
  flagAxeVariable: boolean = true;
  // para modal de advertencia
  flagAddEdit: boolean = false;
  showDialog = false;
  subject = new Subject<boolean>();
  //

  formAdd: FormGroup;
  listCenters: Array<Centro> = [];
  center: any;

  // variables modal preview report
  name = 'old name';
  showIt = false;
  //

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private admin: AdminService,
    private cdr: ChangeDetectorRef,
    public data: DataService,
    private routeActiva: ActivatedRoute
  ) {
    this.formAdd = fb.group({
      nombre: ['', Validators.required],
      centros: ['', Validators.required],
      desde: ['', Validators.required],
      hasta: ['', Validators.required],
      axe: [],
      variable: [],
      deliverdate: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.setFlagAddEdit(false);
    this.getCenters();
    this.getDataFromRute();
    this.getAxes();
    this.getVariables();
    this.validatorsData()
  }

  validateDateDelivery(): any {
    let date = new Date(this.deliverdate);
    let deliverdate = date;
    if (deliverdate < this.today) {
      return true;
    } else {
      return false;
    }
  }

  // modal preview report
  showModal() {
    this.showIt = true;
    this.formAdd.value.axe = this.arrayAxes;
    this.formAdd.value.variable = this.arrayVaribles;
  }

  closeModal(newName: string) {
    this.showIt = false;
    if (newName) this.name = newName;
  }
  //
  //  guarda axes de componente selects
  storageAxes(axes: any, idComponent: number) {
    this.arrayAxes[idComponent] = axes;
    this.validatorsData();
  }
  // guarda array variables de componente selects
  storageVariables(variablesArray: any, idComponent: number) {
    this.arrayVaribles[idComponent] = variablesArray;
    this.validatorsData();
  }

  validatorsData() {
    if (!this.data.editar) {
      if (this.arrayAxes.length == 0 || this.arrayVaribles.length == 0) {
        this.flagAxeVariable = true;
      } else {
        this.flagAxeVariable = false;
      }
    } else {
      this.flagAxeVariable = false;
    }
  }
  // catchFlag(flag:any){
  //   this.flagAxeVariable = flag
  // }
  //
  // agrega un elemento al arreglo de selects y tambien a axes y variables
  createEje() {
    this.arrayc.push(this.arrayc.length + 1);
    this.arrayAxes.push(1);
    this.arrayVaribles.push(1);
  }

  catchCenter(e: any) {
    this.center = e;
  }

  validatorDate(): any {
    if (this.formAdd.value.hasta < this.formAdd.value.desde) {
      return true;
    } else {
      return false;
    }
    
  }

  // validatorAxeVariable(): any{
  //   if(this.arrayAxes.includes(axe) || this.arrayVaribles.length >= 1){
  //     return false
  //   }
  //   else{
  //     return true
  //   }
  // }

  confirm(datos: Report) {
    this.data.arrayAxes = this.arrayAxes;
    this.data.arrayVariables = this.arrayVaribles;
    this.data.arrayCenters = this.center;
    this.data.report = {
      centros: [],
      fechaCreacion: '',
      fechaEntrega: this.formAdd.value.deliverdate,
      id: this.id,
      nombre: this.formAdd.value.nombre,
      variables: [],
      periodoDesde: this.formAdd.value.desde,
      periodoHasta: this.formAdd.value.hasta,
    };

    this.setFlagAddEdit(true);
    this.router.navigate([
      'admin/dashboard/reportes/creacion-de-reportes/add-mod-report/preview-report/' +
        datos.nombre +
        datos.fechaCreacion +
        datos.fechaEntrega,
    ]);
  }

  getCenters() {
    this.admin.getCentros().subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        this.listCenters = data;
        this.centerSelect();
      },
      error: (err) => {
        setTimeout(() => this.cdr.detectChanges());
      },
    });
  }

  // Para modal de advertencia de cambio de pantalla
  setFlagAddEdit(value: boolean) {
    this.flagAddEdit = value;
    localStorage.setItem('flagAddEdit', JSON.stringify(this.flagAddEdit));
  }
  onSelection($event: any) {
    this.showDialog = false;
    if ($event === 'ok') {
      this.subject.next(true);
      this.setFlagAddEdit(false);
    } else {
      this.subject.next(false);
    }
  }
  openDialog() {
    this.showDialog = true;
  }
  //

  getDataFromRute() {
    this.routeActiva.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('report-id');
    });
    if (this.id) {
      this.getReportByID();
      if (this.data.flagDuplicated) {
        this.data.editar = false;
      } else {
        this.data.editar = true;
      }
    }
  }

  getReportByID() {
    this.admin.getReportById(this.id).subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        this.report = data;
        if (this.data.flagDuplicated) {
          this.changeReportName();
        } else {
          this.nombre = this.report.nombre;
        }
        this.desde = this.report.periodoDesde;
        this.hasta = this.report.periodoHasta;
        this.deliverdate = this.report.fechaEntrega;
        this.getAxes();
        this.getCenters();
        this.centerSelect();
        this.variablesSelect();
        this.axesSelect();
      },
      error: (err) => {
        setTimeout(() => this.cdr.detectChanges());
      },
    });
  }

  changeReportName() {
    if (this.data.cantDuplicated > 0) {
      this.nombre =
        this.report.nombre + ' duplicado ' + this.data.cantDuplicated + 1;
    } else {
      this.nombre = this.report.nombre + ' duplicado ';
    }
  }

  // gets centers selected
  centerSelect() {
    this.center = [];
    for (let item of this.listCenters) {
      for (let c of this.report.centros) {
        if (item.id == c.id) {
          this.center.push(item.id);
        }
      }
    }
  }
  //

  variablesSelect() {
    // for (let item of this.listOfVariables) {
    //   for (let c of this.report.variables) {
    //     if (item.id == c.id) {
    //       if (!this.arrayVaribles.includes(item.nombre)) {
    //         this.arrayVaribles.push(item);
    //       }
    //     }
    //   }
    // }
  }
  // Esta funcion elimina elementos repetidos
  deleteDuplicate() {
    let duplicate: any = [];
    let temporary: any = [];
    this.arrayAxes.forEach((value, index) => {
      temporary = Object.assign([], this.arrayAxes);
      temporary.splice(index, 1);
      if (temporary.indexOf(value) != -1 && duplicate.indexOf(value) == -1)
        duplicate.push(value);
    });
    this.arrayAxes.splice(this.arrayAxes.indexOf(temporary[0].id) + 1, 1);
  }
  //

  pushAxes(){
    let axe: Array<any> = [];
    for (let vari of this.report.variables) {
      if (!axe.includes(vari.eje.id)) {
        axe.push(vari.eje.id);
      }
    }
    axe.forEach((element) => {
      this.arrayAxes.push(this.listOfAxes.find((res) => res.id == element));
    });
  }

  // this function add elements in arrays for edit
  axesSelect(): any {
    this.pushAxes()
    this.arrayc.pop();
    for (let c of this.arrayAxes) {
      this.arrayc.push(this.arrayc.length + 1);
      this.arrayVaribles.push(
        this.listOfVariables.filter((res: any) => {
          return res.eje.id == c.id;
        })
      );
    }
  }
  //
  // returns axes by componente
  axreturn(item: any): any {
    if (this.report != null) return this.arrayAxes[this.arrayc.indexOf(item)];
  }
  //

  // returns varibles by componente
  variableReturn(item: any): any {
    if (this.report != null) return this.report.variables;
  }
  //

  getAxes() {
    this.admin.getAxes().subscribe({
      next: (data: axes[]) => {
        this.listOfAxes = data;
        setTimeout(() => this.cdr.detectChanges());
      },
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/auth']);
        }
      },
      complete: () => {},
    });
  }

  getVariables() {
    this.admin.getVariables().subscribe({
      next: (data: variable[]) => {
        this.listOfVariables = data;
        setTimeout(() => this.cdr.detectChanges());
      },
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/auth']);
        }
      },
      complete: () => {},
    });
  }
}
