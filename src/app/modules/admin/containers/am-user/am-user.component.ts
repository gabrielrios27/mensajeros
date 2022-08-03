import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Users } from '../../models/users';
import { Centro } from '../../models/centro';
import { AdminService } from '../../services/admin.service';
import * as e from 'express';

@Component({
  selector: 'app-am-user',
  templateUrl: './am-user.component.html',
  styleUrls: ['./am-user.component.scss'],
})
export class AmUserComponent implements OnInit {
  formUpEdit: FormGroup;
  nombre: any = this.data.user?.nombre;
  email: any = this.data.user?.email;
  contrasena: any = this.data.user?.contrasena;
  centroAsignado: any;

  centros: Array<Centro> = new Array<Centro>();
  // para paginacion de axes
  itemsPerPage: number = 10;
  quantityOfPages: number = 1;
  userListComplete: Array<Users> = new Array();
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
      contrasena: [
        '',
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }

  ngOnInit(): void {
    this.getCentros();
    this.getUsers();
  }

  confirm(user: Users) {
    this.addUser(user, this.centroAsignado);
    this.data.nombreUsuario = this.formUpEdit.value.nombre;
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
  editar(user: Users) {
    user.rolNombre = 'ROLE_USER';
    this.edit(user, this.data.user?.id);
    this.data.nombreUsuario = this.formUpEdit.value.nombre;
  }

  addUser(user: Users, id: number) {
    this.setPageLocalStorage(); //para paginación
    this.admin.addUser(user, id).subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        console.log(data, 'done');
        this.data.flag = false;
        this.data.editar = false;
        this.formUpEdit.reset();
        this.setUserLocStg(this.formUpEdit.value.nombre, true);
        this.router.navigate(['admin/dashboard/usuarios']);
      },
      error: (err) => {
        console.log(err);
        this.data.flag = false;
        this.data.editar = false;
        this.setUserLocStg(this.formUpEdit.value.nombre, true);
        this.router.navigate(['admin/dashboard/usuarios']);
      },
    });
  }

  edit(user: Users, id: any) {
    this.admin.editUser(user, id).subscribe({
      next: (data: any) => {
        setTimeout(() => this.cdr.detectChanges());
        console.log(data);
        this.data.flag = false;
        this.data.editar = false;
        this.setUserLocStg(data, false);
        this.router.navigate(['admin/dashboard/usuarios']);
      },
      error: (err) => {
        this.data.flag = false;
        this.data.editar = false;
        this.setUserLocStg(this.formUpEdit.value.nombre, true);
        this.router.navigate(['admin/dashboard/usuarios']);
        console.log(err);
      },
    });
  }

  getCentros() {
    this.admin.getCentros().subscribe((data) => {
      this.centros = data;
      console.log(this.centros);
    });
  }

  capturarCentro(e: any) {
    this.centroAsignado = e;
  }

  setUserLocStg(data: string, isNewUser: boolean) {
    localStorage.setItem('newOrEditedUser', data);
    localStorage.setItem('isNewUser', JSON.stringify(isNewUser));
  }
}
