import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Centro } from '../models/centro';
import { Users } from '../models/users';

@Injectable()
export class AdminService {
    api_key: string = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtZHAuY29tIiwiaWF0IjoxNjU4MjYwNzQ4LCJleHAiOjE2NTgyNzUxNDh9.bFKv4OdxdHDuzDvmWMAmq9Azib0ARSiO4Qfr3w6egHU'
    baseUrl: string = "https://mensajeros-back-martin.herokuapp.com/"
    constructor(private _http: HttpClient) { }

    getAdmin$(): Observable<{}> {
        return of({});
    }

    headers = new HttpHeaders().set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtZHAuY29tIiwiaWF0IjoxNjU4Nzc4ODAyLCJleHAiOjE2NTg3OTMyMDJ9.fdCX1E2HUjpUcebTlFZm1vXBRQxG5LDTnPqEa7PTbIQ'
    );

    getCentros(): Observable<Centro[]> {
        return this._http.get<Centro[]>(this.baseUrl + 'centros', {
            headers: this.headers
        })
    }

    getUsers(): Observable<Users[]> {
        return this._http.get<Users[]>(this.baseUrl + 'usuarios', {
            headers: this.headers
        })
    }

    deleteUser(id: number): Observable<boolean>{
        return this._http.delete<boolean>(this.baseUrl + 'usuarios/' + id,{
            headers:this.headers
        })
    }

    editUser(id:number): Observable<Response>{
        return this._http.put<Response>(this.baseUrl + 'usuarios/'+ id,{
            headers:this.headers
        })
    }
    

}
