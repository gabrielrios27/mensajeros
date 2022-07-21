import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Centro } from '../../models/centro';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Users } from '../../models/users';

const listu: Users[] = [
  { nombre: 'pepe', contrasena: "1234", email: "pepe@gmail.com" },
  { nombre: 'pepes', contrasena: "1234", email: "pepe@gmail.com" },
  { nombre: 'pepei', contrasena: "1234", email: "pepe@gmail.com" },
];
const list: Centro[] = [
  {
    id: 1,
    nombre: "Colibries",
    usuario: {
      nombre: "pepe",
      email: "pepe@gmail.com",
      contrasena: "1234"
    }
  },
  {
    id: 2,
    nombre: "La Balsa",
    usuario: {
      nombre: "pepe",
      email: "pepe@gmail.com",
      contrasena: "1234"
    }
  },
];

@Component({
  selector: 'app-centers',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './centers.component.html',
  styleUrls: ['centers.component.scss'],
})
export class CentersComponent implements OnInit {

  dataSource = list;
  Centro: any
  editar: boolean = false

  constructor(private router: Router, public data: DataService) { }
  ngOnInit() { 
    this.dataSource = list
  }

  busca(e: string) {

    if (e.toLocaleLowerCase() == '') {
      this.ngOnInit()
    }
    else {
      this.dataSource = list.filter(res => {
        return res.nombre.toLowerCase().match(this.Centro.toLowerCase())
      })
      console.log(this.dataSource)
    }

  }

  create() {
    this.router.navigate(['admin/dashboard/centros/add-mod-center']);
  }

  edit(center: Centro) {
    this.editar = true
    this.router.navigate(['admin/dashboard/centros/add-mod-center'])
    this.data.center = center
    this.data.editar = true
  }

  delete(center: Centro) {
    for (let i of this.dataSource) {
      if (i.nombre === center.nombre) {
        this.dataSource.splice(this.dataSource.indexOf(i), 1)
      }
    }
  }


  close() {
    if (this.data.center != null) {
      this.dataSource.push(this.data.center)
    }

    this.data.flag = false
  }
}

