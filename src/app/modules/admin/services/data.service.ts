import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { Centro } from '../models/centro';
import { report } from 'process';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  nombreUsuario: string =''
  nombreCentro:string=''
  flag: boolean = false
  editar: boolean = false
  flagDelete: boolean= false
  user?: Users
  center?: Centro
  arrayAxes?: any
  arrayVariables? : any
  arrayCenters?:any
  report? : Report  
  constructor() { }
}
