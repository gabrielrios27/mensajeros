import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ReportInfo, UserData } from '../models/user.model';

@Injectable()
export class UserService {
  private subject = new Subject<any>();
  private subjectSaveExit = new Subject<any>();
  private subjectGoBack = new Subject<any>();
  baseUrl: string = 'https://mensajeros-back-martin.herokuapp.com';
  baseUrlTami: string = 'https://mensajeros-back-tami.herokuapp.com';
  ePUserData: string = '/usuarios/datosUsuario';
  ePPendingReports: string = '/reportes/reportesPendientes';
  constructor(private _http: HttpClient) {}
  //envia click cuando se da click al btn confirmar eje en el upload-report.ts
  sendClickEvent() {
    this.subject.next('');
  }
  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }
  //envia click cuando se da click al btn guardar y salir en el upload-report.ts
  sendClickSaveExit() {
    this.subjectSaveExit.next('');
  }
  getClickSaveExit(): Observable<any> {
    return this.subjectSaveExit.asObservable();
  }
  //envia click cuando se da click al btn Atrás en el upload-report.ts
  sendClickGoBack() {
    this.subjectGoBack.next('');
  }
  getClickGoBack(): Observable<any> {
    return this.subjectGoBack.asObservable();
  }
  //obtener datos del usuario logeado
  getUserData(): Observable<UserData> {
    return this._http.get<UserData>(this.baseUrlTami + this.ePUserData);
  }
  //Para carga de reportes
  getPendingReports(): Observable<ReportInfo[]> {
    return this._http.get<ReportInfo[]>(
      this.baseUrlTami + this.ePPendingReports
    );
  }
}
