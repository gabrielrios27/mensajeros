import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Centro } from '../models/centro';
import { Users } from '../models/users';
import { Report } from '../models/report';
import { axes, AxeWithquantity, flag, user, variable } from '../models';
import { report } from 'process';

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
  EPVariables: string = '/variables';
  EPVariablesQuantityPerAxe: string = '/variables/eje';
  // https://mensajeros-back-tami.herokuapp.com/variables/eje/2

  constructor(private _http: HttpClient) {}
  // endpoints centros
  editCenter(center: Centro, id: any): Observable<Centro> {
    return this._http.put<Centro>(this.baseUrlTami + '/centros/' + id, center, {
      headers: this.headers,
    });
  }

  addCenter(center: Centro): Observable<Centro> {
    return this._http.post<Centro>(this.baseUrlTami + '/centros', center, {
      headers: this.headers,
    });
  }

  deleteCenter(id: number): Observable<boolean> {
    return this._http.delete<boolean>(this.baseUrlTami + '/centros/' + id, {
      headers: this.headers,
    });
  }

  getCenter(id: number): Observable<Centro> {
    return this._http.get<Centro>(this.baseUrl + '/centros/' + id);
  }

  getCentros(): Observable<Centro[]> {
    return this._http.get<Centro[]>(this.baseUrlTami + '/centros');
  }
  //
  // endpoints user

  getUsers(): Observable<Users[]> {
    return this._http.get<Users[]>(this.baseUrlTami + '/usuarios');
  }

  addUser(user: Users, id: number): Observable<any> {
    return this._http.post(this.baseUrlTami + '/usuarios/' + id, user, {
      responseType: 'text',
    });
  }
  addUserAdmin(user: Users): Observable<Users> {
    return this._http.post<Users>(this.baseUrlTami + '/auth/agregar', user);
  }
  deleteUser(id: number): Observable<boolean> {
    return this._http.delete<boolean>(this.baseUrlTami + '/usuarios/' + id);
  }

  editUser(user: Users, id: any): Observable<Response> {
    return this._http.put<Response>(this.baseUrlTami + '/usuarios/' + id, user);
  }

  getUser(id: number): Observable<Users> {
    return this._http.get<Users>(this.baseUrlTami + '/usuarios/' + id);
  }

  //
  // endpoints axes

  getAxes(): Observable<axes[]> {
    return this._http.get<axes[]>(this.baseUrl + this.EPAxes);
  }
  getAxeWithId(id: string): Observable<axes> {
    return this._http.get<axes>(this.baseUrlTami + this.EPAxes + '/' + id);
  }
  editAxeWithId(id: string, body: any): Observable<axes> {
    return this._http.put<axes>(
      this.baseUrlTami + this.EPAxes + '/' + id,
      body
    );
  }
  createAxe(body: any): Observable<axes> {
    return this._http.post<axes>(this.baseUrlTami + this.EPAxes, body);
  }
  deleteAxeWithId(id: string): Observable<any> {
    return this._http.delete<axes>(this.baseUrlTami + this.EPAxes + '/' + id);
  }
  //
  // Variables-----------------
  getVariablesQuantityPerAxe(): Observable<AxeWithquantity[]> {
    return this._http.get<AxeWithquantity[]>(
      this.baseUrlTami + this.EPVariablesQuantityPerAxe
    );
  }

  getVariables(): Observable<variable[]> {
    return this._http.get<variable[]>(this.baseUrlTami + this.EPVariables);
  }

  getVariablesGroup(id: string): Observable<variable[]> {
    return this._http.get<variable[]>(
      this.baseUrlTami + this.EPVariablesQuantityPerAxe + '/' + id
    );
  }
  getVariableWithId(id: string): Observable<variable> {
    return this._http.get<variable>(
      this.baseUrlTami + this.EPVariables + '/' + id
    );
  }
  editVariableWithId(id: string, body: any): Observable<variable> {
    return this._http.put<variable>(
      this.baseUrlTami + this.EPVariables + '/' + id,
      body
    );
  }
  createVariable(body: any): Observable<variable> {
    return this._http.post<variable>(this.baseUrlTami + this.EPVariables, body);
  }
  deleteVariableWithId(id: string): Observable<any> {
    return this._http.delete<variable>(
      this.baseUrlTami + this.EPVariables + '/' + id
    );
  }
  // enpoints reports

  getResports(): Observable<Report[]> {
    return this._http.get<Report[]>(this.baseUrlTami + '/reportes');
  }

  deleteReport(id: number): Observable<Report> {
    return this._http.delete<Report>(this.baseUrlTami + '/reportes/' + id);
  }

  addReport(report: any): Observable<Report> {
    return this._http.post<Report>(this.baseUrlTami + '/reportes', report);
  }

  getReportById(id:any): Observable<Report> {
    return this._http.get<Report>(this.baseUrl + '/reportes/' + id);
  }

  editReport(id:any,report:Report): Observable<Report> {
    return this._http.put<Report>(this.baseUrl + '/reportes/' + id , report);
  }

}
