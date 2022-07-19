import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { axes } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  api_key: string = '';
  baseUrl: string = 'https://mensajeros-back-martin.herokuapp.com';
  headers = new HttpHeaders();
  token: string = '';

  EPAxes: string = '/ejes';

  constructor(private _http: HttpClient) {
    // this.token = this.getTokenLocalStorage();
    this.token =
      'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtZHAuY29tIiwiaWF0IjoxNjU4MjU4MTc3LCJleHAiOjE2NTgyNzI1Nzd9.pcnYc6-ZhVgrYGJA3wfl10M_8AZ5TVqmUzXkIWOucc0';
  }
  getTokenLocalStorage(): string {
    let tokenJSON = localStorage.getItem('token');
    let tokenLocStg;
    if (tokenJSON) {
      tokenLocStg = JSON.parse(tokenJSON);
    }
    return tokenLocStg;
  }
  prueba() {
    console.log('prueba funciona');
  }
  getAxes(): Observable<axes[]> {
    this.headers.set('Authorization', 'Bearer ' + this.token);
    return this._http.get<any>(this.baseUrl + this.EPAxes, {
      headers: this.headers,
    });
  }
}
