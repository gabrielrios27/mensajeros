import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getMaxListeners } from 'process';
import { AdminService } from '../../services/admin.service';
import { axes } from '../../models/admin.model';
import { Centro } from '../../models/centro';
import { Report } from '../../models/report';



@Component({
  selector: 'app-add-mod-report',
  templateUrl: './add-mod-report.component.html',
  styleUrls: ['./add-mod-report.component.scss']
})
export class AddModReportComponent implements OnInit {

  nombre: any
  variables: any;
  eje: any
  ejes: Array<any> = ["hola", "pepe", "jose"]
  arrayc: Array<number> = [1]
  arrayAxes : Array<any> = []
  arrayVaribles : Array<any> = []

  // para modal de advertencia
  flagAddEdit: boolean = false;
  showDialog = false;
  subject = new Subject<boolean>();
  //

  formAdd: FormGroup;
  listCenters: Array<Centro>= []
  center: any

  // variables modal preview report
  name = "old name";
  showIt = false;
  //

  constructor(private fb: FormBuilder, private router: Router, private admin: AdminService, private cdr: ChangeDetectorRef) {
    this.formAdd = fb.group({
      nombre: ['', Validators.required],
      centros: ['', Validators.required],
      desde: ['', Validators.required],
      hasta: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.setFlagAddEdit(false);
    this.getCenters()
    
  }

  // modal preview report
  showModal() {
    this.showIt = true;
  }

  closeModal(newName: string) {
    this.showIt = false;
    if (newName) this.name = newName;
  }
  //

  storageAxes(axes: number ){
    this.arrayAxes.push(axes);
    console.log("axes", this.arrayAxes)
  }
  storageVariables( variablesArray: number ){
    this.arrayVaribles.push(variablesArray);
    console.log("variables", this.arrayVaribles)
  }

  createEje() {
    this.arrayc.push(1)
  }

  catchCenter(e: any) {
    this.center = e;
  }


  removeVariable(variable: any) {
    this.variables = this.variables.filter((res: any) => res !== variable);
  }

  confirm(datos:Report) {
    console.log('report',datos)
    // this.router.navigate(['admin/dashboard/reportes/creacion-de-reportes/add-mod-report/preview-report'])
  }

  getCenters() {
    this.admin.getCentros().subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        this.listCenters = data;
        console.log(data);
      },
      error: (err) => {
        setTimeout(() => this.cdr.detectChanges());
        console.log(err);
      },
    });
  }


    // Para modal de advertencia de cambio de pantalla
    setFlagAddEdit(value: boolean) {
      this.flagAddEdit = value;
      localStorage.setItem('flagAddEdit', JSON.stringify(this.flagAddEdit));
    }
    onSelection($event: any) {
      console.log($event);
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
    //
  }
