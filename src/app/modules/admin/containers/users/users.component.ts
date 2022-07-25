import {  ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Users } from '../../models/users';
import { Centro } from '../../models/centro';
import { AdminService } from '../../services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['users.component.scss'],
})
export class UsersComponent implements OnInit {
  usuario: string =''
  user: Array<Users> = new Array
  centros: Array<Centro> = new Array
  usershow: Array<Users> = new Array

  constructor(private router: Router, private route: ActivatedRoute, public data: DataService, private admin: AdminService,private cdr: ChangeDetectorRef) { }


  ngOnInit() {

    // this.getCentros()
    this.getUsers()
  }

  busca(e: string) {

    if (e.toLocaleLowerCase() == '') {
      this.ngOnInit()
    }
    else {
      this.user = this.user.filter(res => {
        return res.nombre.toLocaleLowerCase().match(this.usuario.toLocaleLowerCase())
      })
      console.log(this.usuario)
      console.log(this.user)
    }

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
    for (let c of this.centros) {
      if (user.nombre == c.usuario.nombre) {
        return c.nombre
      }
    }

  }

  getCentros() {
    this.admin.getCentros().subscribe(data => {

      this.centros = data
      console.log(this.centros)
    })
  }

  getUsers() {
    this.admin.getUsers().subscribe({
      next:(res: Users[])=>{
        this.user = res.filter(resp=>{
          return resp.rolNombre?.match("ROLE_USER")
        })
        setTimeout(() => this.cdr.detectChanges())
        console.log(this.user)
      },
      error: (err) =>{
        console.log(err)
      }
    })
  }


  

  close() {
    this.data.flag = false
  }
}
