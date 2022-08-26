import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { user } from 'src/app/modules/admin/models';

@Injectable()
export class LayoutsService {
  baseUrl: string = 'https://mensajeros-back-martin.herokuapp.com';
  EPUsers: string = '/usuarios​';
  isUploadReport: boolean = false;

  constructor(private _http: HttpClient) {}

  getUserWithId(id: string): Observable<user> {
    return this._http.get<user>(this.baseUrl + this.EPUsers + '/' + id);
  }
  setIsUploadReport(value: boolean) {
    this.isUploadReport = value;
  }
  getIsUploadReport(): boolean {
    return this.isUploadReport;
  }
}
