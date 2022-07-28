import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Centro } from '../models/centro';
import { Users } from '../models/users';
import { axes, flag } from '../models';

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


    getCentros(): Observable<Centro[]> {
        return this._http.get<Centro[]>(this.baseUrl + '/centros', {
            headers: this.headers
        })
    }

    editCenter(id:number,center:Centro):Observable<Centro>{
        return this._http.put<Centro>(this.baseUrl + '/centros/'+ id ,center, {
            headers: this.headers
        })
    }

    deleteCenter(id:number):Observable<boolean>{
        return this._http.delete<boolean>(this.baseUrl + '/centros/' + id, {
            headers: this.headers
        })
    }

    addCenter(center:Centro):Observable<Centro>{
        return this._http.post<Centro>(this.baseUrl + '/centros', center, {
            headers: this.headers
        })
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
