import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  ValidatorFn,
} from '@angular/forms';
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
  nombre: any = '';
  email: any = '';
  contrasena: any = '';
  centroAsignado: any;
  flagEdit: boolean = false;
  flagTipoRol: boolean = true;
  rol: any;
  centrosAsignados: Array<number> = [];
  userAsignado?: Users;
  centerSelects: Array<Centro> = [];
  centros: Array<Centro> = new Array<Centro>();
  // para paginacion de centros
  itemsPerPage: number = 10;
  quantityOfPages: number = 1;
  userListComplete: Array<Users> = new Array();
  centrosAsignado: any;
  centro?: Centro;
  rolMDP: any = '';
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
      contrasena: [''],
      selectOp: [this.centroAsig()],
      rolMDP: [''],
    });
  }

  ngOnInit(): void {
    this.getCentros();
    this.getUsers();
    this.validatorEdit();
    this.centroAsig();
    this.validator();
  }

  validator() {
    if (!this.flagEdit) {
      return this.formUpEdit.controls.contrasena.setValidators([
        Validators.required,
        Validators.minLength(8),
      ]);
    } else {
      return this.formUpEdit.controls.contrasena.setValidators(null);
    }
  }

  validatorEdit() {
    if (this.data.editar) {
      this.flagEdit = true;
      this.nombre = this.data.user?.nombre;
      this.email = this.data.user?.email;
      this.rolMDP = this.data.user?.rolMDP;
      if (this.data.user?.rolNombre === 'ROLE_ADMIN') {
        this.flagTipoRol = false;
      }
    } else {
      this.flagEdit = false;
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
        this.userListComplete = res;
      },
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/auth']);
        }
      },
    });
  }

  onDataChange(event: any) {
    this.rol = event.value;
    this.checkRol();
  }

  checkRol() {
    if (this.rol === 'centro') {
      this.flagTipoRol = true;
    } else {
      this.flagTipoRol = false;
    }
  }

  confirm(user: Users) {
    if (this.rol === 'ong') {
      user.rolNombre = 'ROLE_ADMIN';
      this.addUserAdmin(user);
      this.data.nombreUsuario = this.formUpEdit.value.nombre;
    } else {
      // para agregar un usuario a mas de un centro
      if (this.centrosAsignados.length >= 2) {
        this.data.nombreUsuario = this.formUpEdit.value.nombre;
        this.addUser(user, this.centrosAsignados[0]);
        this.SetCentrosLocalStg();
        //
      } else {
        this.data.nombreUsuario = this.formUpEdit.value.nombre;
        this.addUser(user, this.centroAsignado);
      }
    }
  }

  editar(user: Users) {
    if (this.centrosAsignados.length >= 2) {
      this.SetCentrosLocalStg();
      for (let i of this.centros) {
        if (i.id) {
          if (i.id == this.centrosAsignados[0]) {
            this.editCentros(user, this.centrosAsignados[0], i);
          }
        }
      }
      this.edit(user, this.data.user?.id);
    } else {
      for (let i of this.centros) {
        if (i.id) {
          if (i.id == this.centrosAsignados[0]) {
            this.editCentros(user, this.centrosAsignados[0], i);
          }
        }
      }
      this.edit(user, this.data.user?.id);
    }
    this.data.nombreUsuario = this.formUpEdit.value.nombre;
  }

  editCentros(user: Users, idCentro: number, centro: Centro) {
    if (user) {
      centro.usuario = {
        id: this.data.user?.id,
        nombre: '',
        contrasena: '',
        email: '',
        rolNombre: '',
        rolMDP: '',
      };
      this.admin.editCenter(centro, centro.id).subscribe({
        next: (data: any) => {
          setTimeout(() => this.cdr.detectChanges());
        },
        error: (err) => {
          if (err.status === 401) {
            this.router.navigate(['/auth']);
          }
        },
      });
    }
  }

  addUserAdmin(user: Users) {
    this.setPageLocalStorage(); //para paginación
    this.admin.addUserAdmin(user).subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        this.data.flag = false;
        this.data.editar = false;
        this.formUpEdit.reset();
        this.setUserLocStg(this.data.nombreUsuario, true);
        this.router.navigate(['admin/dashboard/usuarios']);
      },
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/auth']);
        }
      },
    });
  }

  addUser(user: Users, id: number) {
    this.setPageLocalStorage(); //para paginación
    this.admin.addUser(user, id).subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        this.data.flag = false;
        this.data.editar = false;
        this.setUserLocStg(this.data.nombreUsuario, true);
        this.formUpEdit.reset();
        this.router.navigate(['admin/dashboard/usuarios']);
      },
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/auth']);
        }
      },
    });
  }

  edit(user: Users, id: any) {
    if (this.contrasena === '') {
      user.contrasena = '';
    } else {
      user.contrasena = this.contrasena;
    }

    this.admin.editUser(user, id).subscribe({
      next: (data: any) => {
        setTimeout(() => this.cdr.detectChanges());
        this.data.flag = false;
        this.data.editar = false;
        this.formUpEdit.reset();
        this.setUserLocStg(data, false);
        this.router.navigate(['admin/dashboard/usuarios']);
      },
      error: (err) => {
        this.data.flag = false;
        if (err.status === 401) {
          this.router.navigate(['/auth']);
        }
      },
    });
  }

  getCentros() {
    this.admin.getCentros().subscribe((data) => {
      setTimeout(() => this.cdr.detectChanges());
      this.centros = data;
      this.centroAsig();
    });
  }

  // para agregar un usuario a mas de un centro
  SetCentrosLocalStg() {
    localStorage.setItem('centroA', JSON.stringify(this.centrosAsignados));
  }
  //

  centroAsig(): any {
    this.centroAsignado = [];
    for (let c of this.centros) {
      if (c.usuario?.nombre === this.data.user?.nombre) {
        this.centroAsignado.push(c.id);
        this.centerSelects.push(this.centroAsignado);
      }
    }
  }

  capturarCentro(e: any) {
    this.centrosAsignados = e;
  }

  setUserLocStg(data: string, isNewUser: boolean) {
    localStorage.setItem('newOrEditedUser', this.data.nombreUsuario);
    localStorage.setItem('isNewUser', JSON.stringify(isNewUser));
  }
}
