import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Users } from '../../models/users';

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

  constructor(private router: Router, private data:DataService, private fb:FormBuilder) {
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
  }

  confirm(){
    this.router.navigate(['admin/dashboard/usuarios']);
    this.data.flag = true
    this.data.nombreUsuario = "pepe"
  }

  edit(){
    
    
  }

}
