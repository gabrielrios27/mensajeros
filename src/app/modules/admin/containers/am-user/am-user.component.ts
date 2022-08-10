import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Users } from '../../models/users';
import { Centro } from '../../models/centro';
import { AdminService } from '../../services/admin.service';
import * as e from 'express';
import { user } from '../../models/admin.model';
import { of } from 'rxjs';

@Component({
  selector: 'app-am-user',
  templateUrl: './am-user.component.html',
  styleUrls: ['./am-user.component.scss'],
})
export class AmUserComponent implements OnInit {

  formUpEdit: FormGroup;
  nombre: any
  email: any
  contrasena: any
  centroAsignado: any
  flagEdit: boolean = false
  flagTipoRol: boolean = true
  rol: any
  centrosAsignados: Array<number> = []
  userAsignado?: Users

  centros: Array<Centro> = new Array<Centro>()
  // para paginacion de centros
  itemsPerPage: number = 10;
  quantityOfPages: number = 1;
  userListComplete: Array<Users> = new Array();
  centrosAsignado: any;
  constructor(
    private router: Router,
    public data: DataService,
    private fb: FormBuilder,
    private admin: AdminService,
    private cdr: ChangeDetectorRef
  ) {
    this.formUpEdit = fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      contrasena: ['',Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }


  ngOnInit(): void {
    this.getCentros()
    this.getUsers()
    this.validatorEdit()
  }

  validatorEdit() {
    if (this.data.editar) {
      this.flagEdit = true
      this.nombre = this.data.user?.nombre
      this.email = this.data.user?.email
      this.contrasena = this.data.user?.contrasena
    }
    else {
      this.flagEdit = false
    }

  }

  setPageLocalStorage() {
    //para paginación
    this.quantityOfPages = Math.ceil(
      (this.userListComplete.length + 1) / this.itemsPerPage
    );
    localStorage.setItem('userPage', JSON.stringify(this.quantityOfPages));
  }
  getUsers() {
    //para paginación
    this.admin.getUsers().subscribe({
      next: (res: Users[]) => {
        this.userListComplete = res.filter((resp) => {
          return resp.rolNombre?.match('ROLE_USER');
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
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
    }
    else {
      // para agregar un usuario a mas de un centro
      if (this.centrosAsignados.length >= 2) {
        console.log(this.centrosAsignados[0])
        this.data.nombreUsuario = this.formUpEdit.value.nombre
        this.addUser(user, this.centrosAsignados[0])
        this.SetCentrosLocalStg()
        //
      }
      else {
        this.data.nombreUsuario = this.formUpEdit.value.nombre
        this.addUser(user, this.centroAsignado)
      }
    }
  }

  editar(user: Users) {
    user.rolNombre = "ROLE_USER"
    this.edit(user, this.data.user?.id)
    this.data.nombreUsuario = this.formUpEdit.value.nombre
  }

  addUserAdmin(user: Users) {
    this.setPageLocalStorage(); //para paginación
    this.admin.addUserAdmin(user).subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges())
        console.log(data, "admin")
        this.data.flag = false
        this.data.editar = false
        this.formUpEdit.reset()
        this.setUserLocStg(this.data.nombreUsuario, true)
        this.router.navigate(['admin/dashboard/usuarios']);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  addUser(user: Users, id: number) {
    this.setPageLocalStorage(); //para paginación
    this.admin.addUser(user, id).subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges())
        console.log(data, "done1")
        this.data.flag = false
        this.data.editar = false
        this.setUserLocStg(this.data.nombreUsuario, true)
        this.formUpEdit.reset()
        this.router.navigate(['admin/dashboard/usuarios']);
      },
      error: (err) => {
        console.log(err)
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
      }
    })

  }

  getCentros() {
    this.admin.getCentros().subscribe(data => {
      setTimeout(() => this.cdr.detectChanges())
      this.centros = data
    })
  }

  // para agregar un usuario a mas de un centro
  SetCentrosLocalStg() {
    localStorage.setItem("centroA",JSON.stringify(this.centrosAsignados))
  }
  // 
  capturarCentro(e: any) {
    this.centrosAsignados = e
  }

  setUserLocStg(data: string, isNewUser: boolean) {
    localStorage.setItem('newOrEditedUser', this.data.nombreUsuario);
    localStorage.setItem('isNewUser', JSON.stringify(isNewUser));
  }
}
