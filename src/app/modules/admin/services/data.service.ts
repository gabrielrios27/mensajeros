import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  nombreUsuario: string =''
  flag: boolean = false
  constructor() { }
}
