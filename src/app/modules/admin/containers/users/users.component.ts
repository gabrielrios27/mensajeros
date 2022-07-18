import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Users } from '../../models/users';



export interface PeriodicElement {
  usuario: string;
  position: number;
  centroAsignado: number;
}

const list: Users[] = [
  { usuario: 'Hydrogen ramon', centroAsignado: 'adas' },
  { usuario: 'Helium pepe', centroAsignado: 'asds' },
  { usuario: 'Lithium tartamudo', centroAsignado: 'asdsad'},
  { usuario: 'Beryllium gege', centroAsignado: 'adasdasd' },
];

@Component({
  selector: 'app-users',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './users.component.html',
  styleUrls: ['users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [ 'usuario', 'centroAsignado','acciones'];
  dataSource = list;
  usuario: any
  
  constructor(private router: Router,private route: ActivatedRoute, public data: DataService) {}


  ngOnInit() {
    this.dataSource = list
  }

  busca(e: string) {

    if(e.toLocaleLowerCase() == ''){
      this.ngOnInit()
    }
    else{
      this.dataSource = list.filter(res => { 
        return res.usuario.toLowerCase().match(this.usuario.toLowerCase())
    })
    console.log(this.dataSource)
    }
    
  }

  create(){
    this.router.navigate(['admin/dashboard/usuarios/create-user']);
  }


  close(){
    this.data.flag = false
  }
}
