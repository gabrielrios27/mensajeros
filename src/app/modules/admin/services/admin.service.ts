import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Centro } from '../models/centro';
import { Users } from '../models/users';


@Injectable({
    providedIn: 'root',
})
export class AdminService {
    api_key: string = '';
    baseUrl: string = 'https://mensajeros-back-martin.herokuapp.com';
    // headers = new HttpHeaders();
    token: string = '';
    EPAxes: string = '/ejes';

    constructor(private _http: HttpClient) { }

    headers = new HttpHeaders().set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtZHAuY29tIiwiaWF0IjoxNjU4OTI1NTQ1LCJleHAiOjE2NTg5Mzk5NDV9.BQ-2jt5xgIPR2ZUPYOUELqD6CX__LxovqmY0dnSjMys'
    );

    getCentros(): Observable<Centro[]> {
        return this._http.get<Centro[]>(this.baseUrl + '/centros', {
            headers: this.headers
        })
    }

    editCenter(id:number,center:Centro):Observable<Centro>{
        return this._http.put<Centro>(this.baseUrl + '/centros'+ id ,center)
    }

    deleteCenter(id:number):Observable<boolean>{
        return this._http.delete<boolean>(this.baseUrl + '/centros' + id)
    }

    addCenter(center:Centro):Observable<Centro>{
        return this._http.post<Centro>(this.baseUrl + '/centros', center)
    }

    getUsers(): Observable<Users[]> {
        return this._http.get<Users[]>(this.baseUrl + '/usuarios', {
            headers: this.headers
        })
    }

    deleteUser(id: number): Observable<boolean> {
        return this._http.delete<boolean>(this.baseUrl + '/usuarios/' + id, {
            headers: this.headers
        })
    }

    editUser(user: Users, id: any): Observable<Response> {
        return this._http.put<Response>(this.baseUrl + '/usuarios/' + id, user, {
            headers: this.headers
        })
    }

    addUser(user: Users, id: number): Observable<Response> {
        return this._http.post<Response>(this.baseUrl + '/usuarios/' + id, user, {
            headers: this.headers
        })
    }
}
