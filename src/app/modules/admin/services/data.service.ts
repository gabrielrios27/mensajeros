import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { Centro } from '../models/centro';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  nombreUsuario: string =''
  nombreCentro:string=''
  flag: boolean = false
  editar: boolean = false
  user?: Users
  center?: Centro
  constructor() { }
}
