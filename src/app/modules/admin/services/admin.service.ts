import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { axes } from '../models';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  api_key: string = '';
  baseUrl: string = 'https://mensajeros-back-martin.herokuapp.com';
  // headers = new HttpHeaders();
  token: string = '';

  // .set('Content-Type', 'application/json')
  headers = new HttpHeaders().set(
    'Authorization',
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtZHAuY29tIiwiaWF0IjoxNjU4Nzk1NjU0LCJleHAiOjE2NTg4MTAwNTR9.1lO5WGtk2s26xRIFUiDuwoZmc7GaL2-HohTVureEZz0'
  );

  EPAxes: string = '/ejes';

  constructor(private _http: HttpClient) {
    // this.token = this.getTokenLocalStorage();
    // this.setHeadersAutorization(this.token);
  }
  getTokenLocalStorage(): string {
    let tokenJSON = localStorage.getItem('token');
    let tokenLocStg;
    if (tokenJSON) {
      tokenLocStg = JSON.parse(tokenJSON);
    }
    return tokenLocStg;
  }
  setHeadersAutorization(token: string) {
    this.headers.set('Authorization', 'Bearer ' + token);
  }
  getAxes(): Observable<axes[]> {
    return this._http.get<axes[]>(this.baseUrl + this.EPAxes, {
      headers: this.headers,
    });
  }
  getAxeWithId(id: string): Observable<axes> {
    return this._http.get<axes>(this.baseUrl + this.EPAxes + '/' + id, {
      headers: this.headers,
    });
  }
  editAxeWithId(id: string, body: any): Observable<axes> {
    return this._http.put<axes>(this.baseUrl + this.EPAxes + '/' + id, body, {
      headers: this.headers,
    });
  }
  createAxe(body: any): Observable<axes> {
    return this._http.post<axes>(this.baseUrl + this.EPAxes, body, {
      headers: this.headers,
    });
  }
  deleteAxeWithId(id: string): Observable<any> {
    return this._http.delete<axes>(this.baseUrl + this.EPAxes + '/' + id, {
      headers: this.headers,
    });
  }
}
