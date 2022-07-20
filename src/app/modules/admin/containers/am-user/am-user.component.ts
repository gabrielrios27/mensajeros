import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Users } from '../../models/users';
import { Centro } from '../../models/centro';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-am-user',
  templateUrl: './am-user.component.html',
  styleUrls: ['./am-user.component.scss']
})
export class AmUserComponent implements OnInit {
  
  formUpEdit: FormGroup;
  nombre: any
  email: any
  contrasena: any
  centroAsignado: any

  centros: Array<Centro> = new Array<Centro>()

  constructor(private router: Router, private data:DataService, private fb:FormBuilder, private admin: AdminService) {
    this.formUpEdit = fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.compose([Validators.required,Validators.email])],
      password: ['', Validators.compose([Validators.required,Validators.minLength(8)])]
    })
  }

  
  ngOnInit(): void {
    this.nombre = this.data.user?.nombre
    this.contrasena = this.data.user?.contrasena
    this.email = this.data.user?.email
    this.centroAsignado = this.data.user?.centroAsignado
    this.getCentros()
    
  }

  confirm(){
    this.router.navigate(['admin/dashboard/usuarios']);
    console.log(this.formUpEdit.value)
    this.data.user = this.formUpEdit.value
    this.data.nombreUsuario = this.formUpEdit.value.nombre
    this.data.flag = true
    this.formUpEdit.reset()
  }

  edit(){
    
    
  }

  getCentros(){
    this.admin.get().subscribe( data=>{
        
        this.centros = data
        console.log(this.centros)
    })
  }

}
