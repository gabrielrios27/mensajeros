import { Injectable } from '@angular/core';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  nombreUsuario: string =''
  flag: boolean = false
  user: Users | undefined 
  constructor() { }
}
