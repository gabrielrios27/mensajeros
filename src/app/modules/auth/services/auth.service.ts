import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, pipe, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Login } from '../models/login';
import { Response } from '../models/response';

@Injectable()
export class AuthService {

    url: string = "https://mensajeros-back-martin.herokuapp.com/"
    private loggedIn = new BehaviorSubject<boolean>(false);


    constructor(private _http: HttpClient) { }


    getAuth$(): Observable<{}> {
        return of({});
    }

    get isLogged(): Observable<boolean> {
        return this.loggedIn.asObservable();
    }

    loginByEmail(form: Login): Observable<Response | void> {
        let direccion = this.url + "auth/login"
        return this._http
            .post<Response>(direccion, form)
            .pipe(
                map((res: Response) => {
                    console.log("done");
                    this.loggedIn.next(true)
                    return res
                }),
                catchError((err) => this.handlerError(err))
            )
    }

    private handlerError(err: any): Observable<never> {
        let errorMsj = " error";
        if (err) {
            console.log(err.status)
        }
        return throwError(errorMsj);
    }



}