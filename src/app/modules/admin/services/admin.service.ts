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
  // headers = new HttpHeaders();
  token: string = '';

  // .set('Content-Type', 'application/json')
  headers = new HttpHeaders().set(
    'Authorization',
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtZHAuY29tIiwiaWF0IjoxNjU4NDI0MDIzLCJleHAiOjE2NTg0Mzg0MjN9.jsGxw4VIYo46rO-NwfbQOIIqBx3Ia1xir7UalZz-7v0'
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
  getAxeWithId(id: number): Observable<axes> {
    return this._http.get<axes>(this.baseUrl + this.EPAxes + `/${{ id }}`, {
      headers: this.headers,
    });
  }
}
