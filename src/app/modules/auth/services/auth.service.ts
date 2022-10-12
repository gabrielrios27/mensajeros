import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, pipe, throwError } from 'rxjs';
import { map, catchError, window } from 'rxjs/operators';
import { role } from '../../admin/models';
import { changePassword } from '../models/changePassword';
import { Login } from '../models/login';
import { Response } from '../models/response';

@Injectable()
export class AuthService {
  url: string = 'https://mensajeros-back-martin.herokuapp.com/';
  baseUrl: string = 'https://mensajeros-back-martin.herokuapp.com/';
  baseUrlTami: string = 'https://mensajeros-back-martin.herokuapp.com/';

  EPAuthority: string = 'usuarios/role';
  loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient, private router: Router) {}

  getAuth$(): Observable<{}> {
    return of({});
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('Usuario');
  }

  loginByEmail(form: Login): Observable<Response | void> {
    let direccion = this.baseUrlTami + 'auth/login';
    return this._http.post<Response>(direccion, form).pipe(
      map((res: Response) => {
        this.loggedIn.next(true);
        return res;
      }),
      catchError((err) => this.handlerError(err))
    );
  }

  private handlerError(err: any): Observable<never> {
    let errorMsj = 'error';
    if (err) {
      errorMsj = err.status;
    }
    return throwError(errorMsj);
  }

  getRole() {
    return this._http.get<role>(this.baseUrlTami + this.EPAuthority).pipe(
      map((data) => {
        return data;
      }),
      catchError((err) => {
        return this.handlerError(err);
      })
    );
  }
  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  sendEmail(email: string): Observable<any> {
    return this._http.post(this.baseUrl + 'email-password/send', email);
  }

  changePassword(form: changePassword): Observable<Response> {
    return this._http.post<Response>(
      this.baseUrlTami + 'email-password/change-password',
      form
    );
  }
}
