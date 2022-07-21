import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Users } from '../../models/users';
import { Form } from '@angular/forms';
import { Centro } from '../../models/centro';
import { AdminService } from '../../services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['users.component.scss'],
})
export class UsersComponent implements OnInit {
  usuario: any
  user: Array<Users> = new Array
  centro: Array<Centro> = new Array

  constructor(private router: Router, private route: ActivatedRoute, public data: DataService, private admin: AdminService) { }


  ngOnInit() {

    this.getCentros()
    this.getUsers()
  }

  busca(e: string) {

    // if (e.toLocaleLowerCase() == '') {
    //   this.ngOnInit()
    // }
    // else {
    //   this.dataSource = list.filter(res => {
    //     return res.nombre.toLowerCase().match(this.usuario.toLowerCase())
    //   })
    //   console.log(this.dataSource)
    // }

  }

  create() {
    this.router.navigate(['admin/dashboard/usuarios/create-user']);
  }

  edit(user: Users) {
    this.router.navigate(['admin/dashboard/usuarios/create-user'])
    this.data.user = user
  }

  delete(user: Users) {
    // for (let i of this.dataSource) {
    //   if (i.nombre === user.nombre) {
    //     this.dataSource.splice(this.dataSource.indexOf(i), 1)
    //   }
    // }
  }

  centroAsignado(user: Users): any {
    for (let c of this.centro) {
      if (user.nombre == c.usuario.nombre) {
        return c.nombre
      }
    }

  }

  getCentros() {
    this.admin.getCentros().subscribe(data => {

      this.centro = data
      console.log(this.centro)
    })
  }

  getUsers() {
    this.admin.getUsers().subscribe(res => {
      this.user = res.filter(resp => {
            return resp.rolNombre?.match("ROLE_USER")
        })
      console.log(this.user)
    })
  }


  close() {
    // if (this.data.user != null) {
    //   this.dataSource.push(this.data.user)
    // }

    // this.data.flag = false
  }
}
