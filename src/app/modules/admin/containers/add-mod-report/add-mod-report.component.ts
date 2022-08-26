import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { axes, variable } from '../../models/admin.model';
import { Centro } from '../../models/centro';
import { Report } from '../../models/report';
import { DataService } from '../../services/data.service';

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
  id: any
  variables: any;
  eje: any;
  ejes: Array<any> = ['hola', 'pepe', 'jose'];
  arrayc: Array<number> = [1];
  arrayAxes: Array<any> = [];
  arrayVaribles: Array<any> = [];
  report: Report = {} as Report
  centerSelects: Array<any> = [];
  axesSelects: Array<any> = [];
  variablesSelects: Array<variable> = [];
  listOfAxes: Array<axes> = [];
  listOfVariables: Array<variable> = [];
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
    private data: DataService,
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

  ngOnInit(){
    this.setFlagAddEdit(false);
    this.getCenters();
    this.getDataFromRute()
    this.getReportByID()
    this.getAxes();
    this.getVariables();
    // console.log(this.arrayAxes)
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
    // console.log("axes", this.arrayAxes)
    // console.log(idComponent)
  }
  // guarda array variables de componente selects
  storageVariables(variablesArray: any, idComponent: number) {
    this.arrayVaribles[idComponent] = variablesArray;
    // console.log("variables", this.arrayVaribles)
  }
  //
  // agrega un elemento al arreglo de selects y tambien a axes y variables
  createEje() {
    this.arrayc.push(this.arrayc.length + 1);
    this.arrayAxes.push(1);
    this.arrayVaribles.push(1);
  }

  catchCenter(e: any) {
    this.center = e;
    this.centerSelect()
  }

  removeVariable(variable: any) {
    this.variables = this.variables.filter((res: any) => res !== variable);
  }

  confirm(datos: Report) {
    this.data.arrayAxes = this.arrayAxes;
    this.data.arrayVariables = this.arrayVaribles;
    this.data.arrayCenters = this.formAdd.value.centros;

    // console.log('report',datos)
    this.setFlagAddEdit(true);
    this.router.navigate([
      'admin/dashboard/reportes/creacion-de-reportes/add-mod-report/preview-report',
      datos,
    ]);
  }

  getCenters() {
    this.admin.getCentros().subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        this.listCenters = data;
        // console.log(data);
      },
      error: (err) => {
        setTimeout(() => this.cdr.detectChanges());
        // console.log(err);
      },
    });
  }

  // Para modal de advertencia de cambio de pantalla
  setFlagAddEdit(value: boolean) {
    this.flagAddEdit = value;
    localStorage.setItem('flagAddEdit', JSON.stringify(this.flagAddEdit));
  }
  onSelection($event: any) {
    // console.log($event);
    this.showDialog = false;
    if ($event === 'ok') {
      this.subject.next(true);
      this.setFlagAddEdit(false);
    } else {
      this.subject.next(false);
    }
  }
  openDialog() {
    // console.log('opn dialog');
    this.showDialog = true;
  }
  //

  getDataFromRute() {
    this.routeActiva.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get("report")
    });
    console.log(this.id)
    if(this.id){
      this.getReportByID()
    }
    
  }

  getReportByID(){
    this.admin.getReportById(this.id).subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        this.report = data;
        this.nombre = this.report.nombre
        this.desde = this.report.periodoDesde
        this.hasta = this.report.periodoHasta
        this.deliverdate = this.report.fechaEntrega
        console.log(this.nombre);
      },
      error: (err) => {
        setTimeout(() => this.cdr.detectChanges());
        // console.log(err);
      },
    });

   
  }

  centerSelect() {
    for (let item of this.listCenters) {
      for (let c of this.report.centros) {
        // console.log(c)
        if (item.id == c) {
          this.center.push(item.nombre);
        }
      }
    }
  }

  variablesSelect() {
    for (let item of this.listOfVariables) {
      for (let c of this.report.variables) {
        if (item.id == c) {
          this.variablesSelects.push(item);
        }
      }
    }
    // console.log(this.variablesSelects)
  }

  axesSelect() {
    for (let item of this.listOfAxes) {
      // console.log(item.id)
      for (let c of this.variablesSelects) {
        // console.log(c.eje)
        if (item.id == c.eje.id) {
          // console.log(item)
          if (!this.axesSelects.includes(item.nombre)) {
            this.axesSelects.push(item.nombre);
          }
        }
      }
    }
    // console.log(this.centerSelects)
  }


  getAxes() {
    this.admin.getAxes().subscribe({
      next: (data: axes[]) => {
        this.listOfAxes = data;
        setTimeout(() => this.cdr.detectChanges());
        // console.log(this.listOfAxes);
      },
      error: (err) => {
        // console.log(err);
        if (err.status === 401) {
          this.router.navigate(['/auth']);
        }
      },
      complete: () => {
        // console.log('Request get axes complete');
      },
    });
  }

  getVariables() {
    this.admin.getVariables().subscribe({
      next: (data: variable[]) => {
        this.listOfVariables = data;
        setTimeout(() => this.cdr.detectChanges());
        // console.log(this.listOfVariables);
      },
      error: (err) => {
        // console.log(err);
        if (err.status === 401) {
          this.router.navigate(['/auth']);
        }
      },
      complete: () => {
        // console.log('Request get axes complete');
      },
    });
  }


}
