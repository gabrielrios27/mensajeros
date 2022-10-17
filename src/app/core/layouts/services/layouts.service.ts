import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from 'src/app/modules/admin/models';
import { UserData } from 'src/app/modules/user/models';

@Injectable()
export class LayoutsService {
  baseUrl: string = 'https://mensajeros-demo-back.herokuapp.com';
  EPUsers: string = '/usuarios​';
  baseUrlTami: string = 'https://mensajeros-back-martin.herokuapp.com';
  ePUserData: string = '/usuarios/datosUsuario';

  constructor(private _http: HttpClient) {}

  getUserWithId(id: string): Observable<user> {
    return this._http.get<user>(this.baseUrl + this.EPUsers + '/' + id);
  }
  //obtener datos del usuario logeado
  getUserData(): Observable<UserData> {
    return this._http.get<UserData>(this.baseUrl + this.ePUserData);
  }
}
