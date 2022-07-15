import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';



export interface PeriodicElement {
  usuario: string;
  position: number;
  centroAsignado: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, usuario: 'Hydrogen ramon', centroAsignado: 1.0079 },
  {position: 2, usuario: 'Helium pepe', centroAsignado: 4.0026 },
  {position: 3, usuario: 'Lithium tartamudo', centroAsignado: 6.941 },
  {position: 4, usuario: 'Beryllium gege', centroAsignado: 9.0122 },
];

@Component({
  selector: 'app-users',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './users.component.html',
  styleUrls: ['users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [ 'usuario', 'centroAsignado','acciones'];
  dataSource = ELEMENT_DATA;
  
  constructor(private router: Router, private _snackBar: MatSnackBar,private route: ActivatedRoute, public data: DataService) {}

  openSnackBar() {
    this._snackBar.open("Usuario creado", "cerrar");
  }

  ngOnInit() {
    this.mostrar()
  }

  create(){
    this.router.navigate(['admin/dashboard/usuarios/create-user']);
  }

  mostrar(){
    let flag = true
    if(flag){
      this.openSnackBar;
    }
  }
}
