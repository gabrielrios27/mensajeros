import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, pipe, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { role } from '../../admin/models';
import { Login } from '../models/login';
import { Response } from '../models/response';

@Injectable()
export class AuthService {
  url: string = 'https://mensajeros-back-tami.herokuapp.com/';
  baseUrl: string = 'https://mensajeros-back-martin.herokuapp.com/';
  baseUrlTami: string = 'https://mensajeros-back-tami.herokuapp.com';

  EPAuthority: string = 'usuarios/role';
  loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private _http: HttpClient, private router: Router) {}

  getAuth$(): Observable<{}> {
    return of({});
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('Usuario');
    this.router.navigate(['auth']);
  }

  loginByEmail(form: Login): Observable<Response | void> {
    let direccion = this.baseUrl + 'auth/login';
    return this._http.post<Response>(direccion, form).pipe(
      map((res: Response) => {
        console.log('done');
        this.loggedIn.next(true);
        return res;
      }),
      catchError((err) => this.handlerError(err))
    );
  }

  private handlerError(err: any): Observable<never> {
    let errorMsj = ' error';
    if (err) {
      console.log(err.status);
    }
    return throwError(errorMsj);
  }

  getRole() {
    return this._http.get<role>(this.baseUrl + this.EPAuthority).pipe(
      map((data) => {
        console.log(data);

        return data;
      }),
      catchError((err) => {
        console.log(err.status);
        return this.handlerError(err);
      })
    );
  }
  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
