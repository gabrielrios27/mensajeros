import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subject, of } from 'rxjs';
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
  id: any;
  variables: any;
  eje: any;
  ejes: Array<any> = ['hola', 'pepe', 'jose'];
  arrayc: Array<number> = [1];
  arrayAxes: Array<any> = [];
  arrayVaribles: Array<any> = [];
  report: Report = {} as Report;
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

  ngOnInit() {
    this.setFlagAddEdit(false);
    this.getCenters();
    this.getDataFromRute();
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
    console.log("axes", this.arrayAxes)
    // console.log(idComponent)
  }
  // guarda array variables de componente selects
  storageVariables(variablesArray: any, idComponent: number) {
    this.arrayVaribles[idComponent] = variablesArray;
    console.log("variables", this.arrayVaribles)
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
  }

  removeVariable(variable: any) {
    this.variables = this.variables.filter((res: any) => res !== variable);
  }

  confirm(datos: Report) {
    this.data.arrayAxes = this.arrayAxes;
    this.data.arrayVariables = this.arrayVaribles;
    this.data.arrayCenters = this.center;
    this.data.report = {
      centros: [],
      fechaCreacion: '',
      fechaEntrega: this.formAdd.value.deliverdate,
      id: [],
      nombre: this.formAdd.value.nombre,
      variables: [],
      periodoDesde : this.formAdd.value.desde,
      periodoHasta : this.formAdd.value.hasta
    }

    console.log('report',this.data.arrayVariables)
    this.setFlagAddEdit(true);
    this.router.navigate([
      'admin/dashboard/reportes/creacion-de-reportes/add-mod-report/preview-report/'+
      datos.nombre + datos.fechaCreacion + datos.fechaEntrega,
    ]);
  }

  getCenters() {
    this.admin.getCentros().subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        this.listCenters = data;
        this.centerSelect()
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
      this.id = params.get('report-id');
    });
    // console.log(this.id);
    if (this.id) {
      this.getReportByID();
    }
  }

  getReportByID() {
    this.admin.getReportById(this.id).subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        this.report = data;
        this.nombre = this.report.nombre;
        this.desde = this.report.periodoDesde;
        this.hasta = this.report.periodoHasta;
        this.deliverdate = this.report.fechaEntrega;
        console.log(data);
        this.getAxes();
        this.getCenters();
        this.centerSelect();
        this.variablesSelect();
        this.axesSelect();
      },
      error: (err) => {
        setTimeout(() => this.cdr.detectChanges());
        // console.log(err);
      },
    });
  }


  // gets centers selected
  centerSelect() {
    this.center = [];
    for (let item of this.listCenters) {
      for (let c of this.report.centros) {
        // console.log(c)
        if (item.id == c.id) {
          this.center.push(item.id);
        }
      }
    }
    console.log("center",this.center)
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
    
    console.log(this.arrayVaribles);
  }

  // thi function add elements in arrays for edit
  axesSelect(): any {
      for (let c of this.report.variables) {
        console.log("eje ",c.eje)
        if (this.arrayAxes.find(c.eje) == undefined) {
          this.arrayAxes.push(c.eje);
        }
      }
      console.log(this.arrayAxes)
      this.arrayc.pop();
      for (let c of this.arrayAxes) {
        console.log(c)
        this.arrayc.push(this.arrayc.length + 1);
        // for(let v of this.listOfVariables){
        //   if(v.eje.id === c.id){
        //     this.variablesSelects.push(v)
        //   }
        //   console.log("varible",this.variablesSelects)
        //   this.arrayVaribles[this.arrayAxes.indexOf(c)] = this.variablesSelects
        // }
        this.arrayVaribles.push(this.listOfVariables.filter((res:any) => {return res.eje.id == c.id}))
      }
      console.log("variables",this.arrayVaribles);
  }
  // 
  // returns axes by componente  
  axreturn(item: any): any {
    if(this.report!= null)
    // console.log(this.arrayc.indexOf(item))
    
    return this.arrayAxes[this.arrayc.indexOf(item)];
  }
  // 

  // returns varibles by componente 
  variableReturn(item: any): any {
    if(this.report!= null)
      // console.log(
      //   this.arrayVaribles.filter((res: any) => {
      //     return res.eje.id == this.arrayAxes[this.arrayc.indexOf(item)].id;
      //   })
      // );
      return this.arrayVaribles[this.arrayc.indexOf(item)]
  }
  // 
  

  getAxes() {
    this.admin.getAxes().subscribe({
      next: (data: axes[]) => {
        this.listOfAxes = data;
        setTimeout(() => this.cdr.detectChanges());
        // console.log('axes', this.listOfAxes);
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
        // console.log('variables', this.listOfVariables);
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
