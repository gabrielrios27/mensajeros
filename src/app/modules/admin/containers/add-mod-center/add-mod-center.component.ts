import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-add-mod-center',
  templateUrl: './add-mod-center.component.html',
  styleUrls: ['./add-mod-center.component.scss']
})
export class AddModCenterComponent implements OnInit {
  formUpEdit: FormGroup;
  nombre: any
  Zona: any

  constructor(private router: Router, public data:DataService, private fb:FormBuilder) {
    this.formUpEdit = fb.group({
      nombre: ['', Validators.required],
      zona: ['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.nombre = this.data.center?.nombre

  }

  confirm(){
    this.router.navigate(['admin/dashboard/centros']);
    console.log(this.formUpEdit.value)
    this.data.flag = true
    this.data.editar = false
    this.data.center = this.formUpEdit.value
    this.data.nombreCentro = this.formUpEdit.value.nombre
    this.formUpEdit.reset()
  }

  editar(){
    this.router.navigate(['admin/dashboard/centros']);
    this.data.flag = true
    this.data.editar = true
    this.formUpEdit.reset()
    this.data.nombreCentro = this.formUpEdit.value.nombre
  }

}
