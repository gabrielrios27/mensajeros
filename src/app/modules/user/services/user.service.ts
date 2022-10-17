import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  AnswersUpload,
  ReportComplete,
  ReportInfo,
  ReportToUpload,
  UserData,
} from '../models/user.model';

@Injectable()
export class UserService {
  private subject = new Subject<any>();
  private subjectSaveExit = new Subject<any>();
  private subjectGoBack = new Subject<any>();
  private subjectGoBackLastAxe = new Subject<any>();
  baseUrl: string = 'https://mensajeros-demo-back.herokuapp.com';
  baseUrlTami: string = 'https://mensajeros-back-martin.herokuapp.com';
  ePUserData: string = '/usuarios/datosUsuario';
  ePPendingReports: string = '/reportes/reportesPendientes';
  ePCompleteReports: string = '/reportes/reportesCompletos';
  ePReportToUpload: string = '/carga/';
  ePCommentToUpload: string = '/carga/add/';
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
  sendClickGoBackLastAxe() {
    this.subjectGoBackLastAxe.next('');
  }
  getClickGoBack(): Observable<any> {
    return this.subjectGoBack.asObservable();
  }
  getClickGoBackLastAxe(): Observable<any> {
    return this.subjectGoBackLastAxe.asObservable();
  }
  //obtener datos del usuario logeado
  getUserData(): Observable<UserData> {
    return this._http.get<UserData>(this.baseUrl + this.ePUserData);
  }
  //Para carga de reportes
  getPendingReports(): Observable<ReportInfo[]> {
    return this._http.get<ReportInfo[]>(this.baseUrl + this.ePPendingReports);
  }
  getCompleteReports(): Observable<ReportComplete[]> {
    return this._http.get<ReportComplete[]>(
      this.baseUrl + this.ePCompleteReports
    );
  }
  getReportToUpload(
    idReport: number,
    idCenter: number
  ): Observable<ReportToUpload> {
    return this._http.get<ReportToUpload>(
      this.baseUrl + this.ePReportToUpload + idReport + '/' + idCenter
    );
  }
  putReportToUpload(
    idReport: number,
    idCenter: number,
    report: ReportToUpload
  ): Observable<ReportToUpload> {
    let body: AnswersUpload = {} as AnswersUpload;
    body.ejeActual = report.ejeActual;
    body.fechaCompletado = report.fechaCompletado;
    body.respuestas = report.respuestas;
    return this._http.put<ReportToUpload>(
      this.baseUrl + this.ePReportToUpload + idReport + '/' + idCenter,
      body
    );
  }
  postReportToUpload(
    idReport: number,
    idCenter: number
  ): Observable<ReportToUpload> {
    return this._http.post<ReportToUpload>(
      this.baseUrl + this.ePReportToUpload + idReport + '/' + idCenter,
      {}
    );
  }
  getReportToUploadPerAxe(
    idReport: number,
    idCenter: number,
    idAxe: number
  ): Observable<ReportToUpload> {
    return this._http.get<ReportToUpload>(
      this.baseUrl +
        this.ePReportToUpload +
        idReport +
        '/' +
        idCenter +
        '/' +
        idAxe
    );
  }
  //agregar observación final a reporte /carga/add/{idReporte}/{idCentro}
  putCommentToUpload(
    idReport: number,
    idCenter: number,
    comment: string
  ): Observable<string> {
    return this._http.put(
      this.baseUrl + this.ePCommentToUpload + idReport + '/' + idCenter,
      { obser: comment },
      {
        responseType: 'text',
      }
    );
  }
}
