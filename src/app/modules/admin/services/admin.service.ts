import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Centro } from '../models/centro';

@Injectable()
export class AdminService {
    api_key: string = ''
    baseUrl: string =  "https://mensajeros-back-martin.herokuapp.com/"

    constructor(private _http: HttpClient) {}

    getAdmin$(): Observable<{}> {
        return of({});
    }

    getCentro(): Observable<any>{
        //let params = new HttpParams().set('api_key', this.api_Key);
        return this._http.get<Centro[]>(this.baseUrl + 'centros')
    }

}
