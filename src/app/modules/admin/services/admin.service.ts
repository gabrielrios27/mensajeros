import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Centro } from '../models/centro';

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
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtZHAuY29tIiwiaWF0IjoxNjU4MjYzMTY4LCJleHAiOjE2NTgyNzc1Njh9.suxjupF4RQLDoZereV9y8HLWuz5VGM0OuJTB2NxkibQ'
    );

    get(): Observable<Centro[]> {
        return this._http.get<Centro[]>(this.baseUrl + 'centros', {
            headers: this.headers
        })
    }

}
