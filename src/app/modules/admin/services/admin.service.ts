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
    baseUrlTami: string = 'https://mensajeros-back-tami.herokuapp.com'
    headers = new HttpHeaders();
    token: string = '';
    EPAxes: string = '/ejes';

    constructor(private _http: HttpClient) { }

    editCenter(id:number,center:Centro):Observable<Centro>{
        return this._http.put<Centro>(this.baseUrlTami + '/centros/'+ id ,center, {
            headers: this.headers
        })
    }

    deleteCenter(id:number):Observable<boolean>{
        return this._http.delete<boolean>(this.baseUrlTami + '/centros/' + id, {
            headers: this.headers
        })
    }

    addCenter(center:Centro):Observable<Centro>{
        return this._http.post<Centro>(this.baseUrlTami + '/centros', center, {
            headers: this.headers
        })
    }

    getCentros(): Observable<Centro[]> {
        return this._http.get<Centro[]>(this.baseUrlTami + '/centros')
    }

    getUsers(): Observable<Users[]> {
        return this._http.get<Users[]>(this.baseUrlTami + '/usuarios')
    }

    deleteUser(id: number): Observable<boolean> {
        return this._http.delete<boolean>(this.baseUrlTami + '/usuarios/' + id)
    }

    editUser(user: Users, id: any): Observable<Response> {
        return this._http.put<Response>(this.baseUrlTami + '/usuarios/' + id, user)
    }

    addUser(user: Users, id: number): Observable<Users> {
        return this._http.post<Users>(this.baseUrlTami + '/usuarios/' + id, user)
    }

    getUser(id:number): Observable<Users> {
        return this._http.get<Users>(this.baseUrlTami + '/usuarios/'+ id)
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
