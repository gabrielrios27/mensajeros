import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Centro } from '../../models/centro';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-mod-center',
  templateUrl: './add-mod-center.component.html',
  styleUrls: ['./add-mod-center.component.scss']
})
export class AddModCenterComponent implements OnInit {
  formUpEdit: FormGroup;
  nombre: any
  Zona: any

  constructor(private router: Router, public data:DataService, private fb:FormBuilder, private admin: AdminService, private cdr: ChangeDetectorRef) {
    this.formUpEdit = fb.group({
      nombre: ['', Validators.required],
      zona: ['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.nombre = this.data.center?.nombre

  }

  confirm(){
    console.log(this.formUpEdit.value)
    this.addCenter(this.formUpEdit.value)
    this.data.nombreCentro = this.formUpEdit.value.nombre
    this.formUpEdit.reset()
  }

  addCenter(center: Centro){
    this.admin.addCenter(center).subscribe({
      next: data =>{
        setTimeout(() => this.cdr.detectChanges());
        console.log(data)
        this.data.flag = true
        this.data.editar = false
        this.router.navigate(['admin/dashboard/centros']);
      },
      error: err =>{
        setTimeout(() => this.cdr.detectChanges());
        console.log(err)
        
      }
    })
  }

  editar(){
    let id = this.data.center?.id
    this.editCenter(id)
    this.formUpEdit.reset()
  }

  editCenter(id: any){
    console.log(this.formUpEdit.value)
    this.admin.editCenter(this.formUpEdit.value,id).subscribe({
      next: data =>{
        setTimeout(() => this.cdr.detectChanges());
        console.log(data)
        this.data.flag = true
        this.data.editar = true
        this.router.navigate(['admin/dashboard/centros']);
      },
      error: err =>{
        setTimeout(() => this.cdr.detectChanges());
        console.log(err)
      }
    })
  }

}
