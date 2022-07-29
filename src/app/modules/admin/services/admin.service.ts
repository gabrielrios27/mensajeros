import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Centro } from '../models/centro';
import { Users } from '../models/users';
import { axes, flag, user } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  api_key: string = '';
  baseUrl: string = 'https://mensajeros-back-martin.herokuapp.com';
  baseUrlTami: string = 'https://mensajeros-back-tami.herokuapp.com';
  headers = new HttpHeaders();
  token: string = '';
  EPAxes: string = '/ejes';

  constructor(private _http: HttpClient) {}

  editCenter(center: Centro, id: any): Observable<Centro> {
    return this._http.put<Centro>(this.baseUrl + '/centros/' + id, center, {
      headers: this.headers,
    });
  }

  deleteCenter(id: number): Observable<boolean> {
    return this._http.delete<boolean>(this.baseUrl + '/centros/' + id, {
      headers: this.headers,
    });
  }

  addCenter(center: Centro): Observable<Centro> {
    return this._http.post<Centro>(this.baseUrl + '/centros', center, {
      headers: this.headers,
    });
  }
  getCenter(id: number): Observable<Centro> {
    return this._http.get<Centro>(this.baseUrl + '/centros/' + id);
  }

  getCentros(): Observable<Centro[]> {
    return this._http.get<Centro[]>(this.baseUrl + '/centros');
  }

  getUsers(): Observable<Users[]> {
    return this._http.get<Users[]>(this.baseUrl + '/usuarios');
  }

  deleteUser(id: number): Observable<boolean> {
    return this._http.delete<boolean>(this.baseUrl + '/usuarios/' + id);
  }

  editUser(user: Users, id: any): Observable<Response> {
    return this._http.put<Response>(this.baseUrl + '/usuarios/' + id, user);
  }

  addUser(user: Users, id: number): Observable<Users> {
    return this._http.post<Users>(this.baseUrl + '/usuarios/' + id, user);
  }

  getUser(id: number): Observable<Users> {
    return this._http.get<Users>(this.baseUrl + '/usuarios/' + id);
  }

  getAxes(): Observable<axes[]> {
    return this._http.get<axes[]>(this.baseUrl + this.EPAxes);
  }
  getAxeWithId(id: string): Observable<axes> {
    return this._http.get<axes>(this.baseUrl + this.EPAxes + '/' + id);
  }
  editAxeWithId(id: string, body: any): Observable<axes> {
    return this._http.put<axes>(this.baseUrl + this.EPAxes + '/' + id, body);
  }
  createAxe(body: any): Observable<axes> {
    return this._http.post<axes>(this.baseUrl + this.EPAxes, body);
  }
  deleteAxeWithId(id: string): Observable<any> {
    return this._http.delete<axes>(this.baseUrl + this.EPAxes + '/' + id);
  }
}
