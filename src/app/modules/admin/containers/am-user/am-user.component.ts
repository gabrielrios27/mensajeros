import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Users } from '../../models/users';
import { Centro } from '../../models/centro';
import { AdminService } from '../../services/admin.service';
import * as e from 'express';

@Component({
  selector: 'app-am-user',
  templateUrl: './am-user.component.html',
  styleUrls: ['./am-user.component.scss']
})
export class AmUserComponent implements OnInit {

  formUpEdit: FormGroup;
  nombre: any = this.data.user?.nombre
  email: any = this.data.user?.email
  contrasena: any = this.data.user?.contrasena
  centroAsignado: any
  flagTipoRol: boolean = true
  rol: any

  centros: Array<Centro> = new Array<Centro>()

  constructor(private router: Router, public data: DataService, private fb: FormBuilder, private admin: AdminService, private cdr: ChangeDetectorRef) {
    this.formUpEdit = fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      contrasena: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      rol: new FormControl(),
    })
  }


  ngOnInit(): void {
    this.getCentros()

  }

  onDataChange(event: any) {
    this.rol = event.value
    this.checkRol()
  }

  checkRol() {
    if (this.rol === 'centro') {
      this.flagTipoRol = true
    }
    else {
      this.flagTipoRol = false
    }
  }

  confirm(user: Users) {
    if (this.rol === "ong") {
      user.rolNombre = "ROLE_ADMIN"
      this.addUserAdmin(user)
      this.data.nombreUsuario = this.formUpEdit.value.nombre
      this.formUpEdit.reset()
    }
    else {
      if (this.centroAsignado.length >= 2) {
        for (let i of this.centroAsignado) {
          this.addUser(user, i)
          this.data.nombreUsuario = this.formUpEdit.value.nombre
          this.formUpEdit.reset()
        }

      }
      this.addUser(user, this.centroAsignado)
      this.data.nombreUsuario = this.formUpEdit.value.nombre
      this.formUpEdit.reset()
    }

  }

  editar(user: Users) {
    user.rolNombre = "ROLE_USER"
    this.edit(user, this.data.user?.id)
    this.data.nombreUsuario = this.formUpEdit.value.nombre

  }

  addUserAdmin(user: Users) {
    this.admin.addUserAdmin(user).subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges())
        console.log(data, "done")
        this.data.flag = false
        this.data.editar = false
        this.formUpEdit.reset()
        this.setUserLocStg(this.formUpEdit.value.nombre, true)
        this.router.navigate(['admin/dashboard/usuarios']);
      },
      error: (err) => {
        console.log(err)
        this.data.flag = false
        this.data.editar = false
        this.setUserLocStg(this.formUpEdit.value.nombre, true)
        this.router.navigate(['admin/dashboard/usuarios']);
      }
    })
  }

  addUser(user: Users, id: number) {
    this.admin.addUser(user, id).subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges())
        console.log(data, "done")
        this.data.flag = false
        this.data.editar = false
        this.formUpEdit.reset()
        this.setUserLocStg(this.formUpEdit.value.nombre, true)
        this.router.navigate(['admin/dashboard/usuarios']);
      },
      error: (err) => {
        console.log(err)
        this.data.flag = false
        this.data.editar = false
        this.setUserLocStg(this.formUpEdit.value.nombre, true)
        this.router.navigate(['admin/dashboard/usuarios']);
      }
    })
  }

  edit(user: Users, id: any) {
    this.admin.editUser(user, id).subscribe({
      next: (data: any) => {
        setTimeout(() => this.cdr.detectChanges())
        console.log(data)
        this.data.flag = false
        this.data.editar = false
        this.setUserLocStg(data, false)
        this.router.navigate(['admin/dashboard/usuarios']);
      },
      error: (err) => {
        this.data.flag = false
        this.data.editar = false
        this.setUserLocStg(this.formUpEdit.value.nombre, true)
        this.router.navigate(['admin/dashboard/usuarios']);
        console.log(err)
      }
    })

  }

  getCentros() {
    this.admin.getCentros().subscribe(data => {
      this.centros = data
      console.log(this.centros)
    })
  }

  capturarCentro(e: any) {
    this.centroAsignado = e
    console.log(e)
  }

  setUserLocStg(data: string, isNewUser: boolean) {
    localStorage.setItem('newOrEditedUser', data);
    localStorage.setItem('isNewUser', JSON.stringify(isNewUser));
  }
}
