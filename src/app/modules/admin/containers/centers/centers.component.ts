import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Centro } from '../../models/centro';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Users } from '../../models/users';

const list: Centro[] = [
  {
    id: 1,
    nombre: "Colibries",
    zona: "capital"
    
  },
  {
    id: 2,
    nombre: "La Balsa",
    zona:"trinidad"
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

  getAxeLocalStorage() {
    if (this.data.editar) {
      setTimeout(() => {
        this.close();
      }, 3000);
    }
    if (this.data.flag) {
      setTimeout(() => {
        this.close();
      }, 3000);
    }
    if (this.data.flagDelete) {
      setTimeout(() => {
        this.close();
      }, 2000);
    }
    
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
    this.data.editar= false
    this.data.flagDelete= false
    this.data.flag = false
  }
}

