import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Users } from '../../models/users';
import { Form } from '@angular/forms';
import { Centro } from '../../models/centro';



export interface PeriodicElement {
  usuario: string;
  position: number;
  centroAsignado: number;
}

const list: Users[] = [
  { nombre: 'Facundo Gonzalez', contrasena: "1234", email: "pepe@gmail.com", id: 1 },
  { nombre: 'pepes', contrasena: "1234", email: "pepe@gmail.com", id: 2 },
  { nombre: 'pepei', contrasena: "1234", email: "pepe@gmail.com", id: 3 },
];

const centros: Centro[] = [
  {
  id: 1,
  nombre: "Colibries",
  usuario:  {
    id: 1,
    nombre: "Facundo Gonzalez",
    email: "facugonzalez@gmail.com"
  }
},
{
  id: 2,
    nombre: "La Balsa",
  usuario: {
    id: 1,
      nombre: "pepes",
      email: "facugonzalez@gmail.com"
  }
}
]

@Component({
  selector: 'app-users',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './users.component.html',
  styleUrls: ['users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'usuario', 'centroAsignado', 'acciones'];
  dataSource = list;
  usuario: any
  //centro: Array<Centro> = new Array
  centros = centros

  constructor(private router: Router, private route: ActivatedRoute, public data: DataService) { }


  ngOnInit() {
    this.dataSource = list
  }

  busca(e: string) {

    if (e.toLocaleLowerCase() == '') {
      this.ngOnInit()
    }
    else {
      this.dataSource = list.filter(res => {
        return res.nombre.toLowerCase().match(this.usuario.toLowerCase())
      })
      console.log(this.dataSource)
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
    for (let i of this.dataSource) {
      if (i.nombre === user.nombre) {
        this.dataSource.splice(this.dataSource.indexOf(i), 1)
      }
    }
  }

  getCentro(user: Users): any {
    for (let centro of centros) {
      if (user.nombre == centro.usuario.nombre) {
        return centro.nombre
      }
    }

  }


  close() {
    if (this.data.user != null) {
      this.dataSource.push(this.data.user)
    }

    this.data.flag = false
  }
}
