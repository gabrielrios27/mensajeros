import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Centro } from '../models/centro';
import { Users } from '../models/users';
import { Report } from '../models/report';
import {
  Activity,
  axes,
  AxeWithquantity,
  BodyComparativeReport,
  Comments,
  ComparativeReports,
  CreatedComparativeReport,
  DownloadExcel,
  flag,
  ReceivedReport,
  ReportByCenter,
  user,
  variable,
  VariableInCommon,
} from '../models';
import { comment } from '../models/comment';
import { report } from 'process';
import { text } from '@fortawesome/fontawesome-svg-core';
import { evolutionVariable } from '../models/evolutionVariable';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  api_key: string = '';
  url: string = 'https://mensajeros-demo-back.herokuapp.com';
  baseUrl: string = 'https://mensajeros-demo-back.herokuapp.com';
  baseUrlTami: string = 'https://mensajeros-back-martin.herokuapp.com';
  headers = new HttpHeaders();
  token: string = '';
  EPAxes: string = '/ejes';
  EPVariables: string = '/variables';
  EPVariablesQuantityPerAxe: string = '/variables/eje';
  // https://mensajeros-back-tami.herokuapp.com/variables/eje/2

  constructor(private _http: HttpClient) {}
  // endpoints centros
  editCenter(center: Centro, id: any): Observable<Centro> {
    return this._http.put<Centro>(this.baseUrl + '/centros/' + id, center, {
      headers: this.headers,
    });
  }

  addCenter(center: Centro): Observable<Centro> {
    return this._http.post<Centro>(this.baseUrl + '/centros', center, {
      headers: this.headers,
    });
  }

  deleteCenter(id: number): Observable<boolean> {
    return this._http.delete<boolean>(this.baseUrl + '/centros/' + id, {
      headers: this.headers,
    });
  }

  getCenter(id: number): Observable<Centro> {
    return this._http.get<Centro>(this.baseUrl + '/centros/' + id);
  }

  getCentros(): Observable<Centro[]> {
    return this._http.get<Centro[]>(this.baseUrl + '/centros');
  }
  //reportes comparativos
  getReportByIdCenter(id: number): Observable<ReportByCenter[]> {
    return this._http.get<ReportByCenter[]>(
      this.baseUrl + '/reportes/reporteSegunCentro/' + id
    );
  }
  getVariablesInCommon(
    idReport1: number,
    idReport2: number
  ): Observable<VariableInCommon[]> {
    return this._http.get<VariableInCommon[]>(
      this.baseUrl +
        '/variables/variablesEnComun/' +
        idReport1 +
        '/' +
        idReport2
    );
  }
  createPreviewComparativeReport(
    body: BodyComparativeReport
  ): Observable<ComparativeReports> {
    return this._http.post<ComparativeReports>(
      this.baseUrl + '/informes/preview',
      body
    );
  }
  createComparativeReport(
    body: BodyComparativeReport
  ): Observable<ComparativeReports> {
    return this._http.post<ComparativeReports>(
      this.baseUrl + '/informes',
      body
    );
  }
  //ver informes comparativos
  getComparativeReportByIdReport(id: number): Observable<ComparativeReports> {
    return this._http.get<ComparativeReports>(this.baseUrl + '/informes/' + id);
  }
  getComparativeReportsByIdCenter(
    id: number
  ): Observable<CreatedComparativeReport[]> {
    return this._http.get<CreatedComparativeReport[]>(
      this.baseUrl + '/informes/centro/' + id
    );
  }
  deleteComparativeReport(id: number): Observable<boolean> {
    return this._http.delete<boolean>(this.baseUrl + '/informes/' + id);
  }
  // endpoints user

  getUsers(): Observable<Users[]> {
    return this._http.get<Users[]>(this.baseUrl + '/usuarios');
  }

  addUser(user: Users, id: number): Observable<any> {
    return this._http.post(this.baseUrl + '/usuarios/' + id, user, {
      responseType: 'text',
    });
  }
  addUserAdmin(user: Users): Observable<Users> {
    return this._http.post<Users>(this.baseUrl + '/auth/agregar', user);
  }
  deleteUser(id: number): Observable<boolean> {
    return this._http.delete<boolean>(this.baseUrl + '/usuarios/' + id);
  }

  editUser(user: Users, id: any): Observable<Response> {
    return this._http.put<Response>(this.baseUrl + '/usuarios/' + id, user);
  }

  getUser(id: number): Observable<Users> {
    return this._http.get<Users>(this.baseUrl + '/usuarios/' + id);
  }
  //obtener log de actividades
  getActivityLogByIdUser(id: number): Observable<Activity[]> {
    return this._http.get<Activity[]>(this.baseUrl + '/logs/' + id);
  }

  // endpoints axes

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
  //
  // Variables-----------------
  getVariablesQuantityPerAxe(): Observable<AxeWithquantity[]> {
    return this._http.get<AxeWithquantity[]>(
      this.baseUrl + this.EPVariablesQuantityPerAxe
    );
  }

  getCenterPerVariables(idVariable: number): Observable<Centro[]> {
    return this._http.get<Centro[]>(
      this.baseUrl + '/centros/segunVariable/' + idVariable
    );
  }

  getVariables(): Observable<variable[]> {
    return this._http.get<variable[]>(this.baseUrl + this.EPVariables);
  }

  getVariablesGroup(id: string): Observable<variable[]> {
    return this._http.get<variable[]>(
      this.baseUrl + this.EPVariablesQuantityPerAxe + '/' + id
    );
  }
  getVariableWithId(id: string): Observable<variable> {
    return this._http.get<variable>(this.baseUrl + this.EPVariables + '/' + id);
  }
  editVariableWithId(id: string, body: any): Observable<variable> {
    return this._http.put<variable>(
      this.baseUrl + this.EPVariables + '/' + id,
      body
    );
  }
  createVariable(body: any): Observable<variable> {
    return this._http.post<variable>(this.baseUrl + this.EPVariables, body);
  }
  deleteVariableWithId(id: string): Observable<any> {
    return this._http.delete<variable>(
      this.baseUrl + this.EPVariables + '/' + id
    );
  }

  getEvolutionOfVariable(
    idCenter: number,
    idVariable: number
  ): Observable<evolutionVariable[]> {
    return this._http.get<evolutionVariable[]>(
      this.baseUrl +
        '/variables/evolucionVariable/' +
        idCenter +
        '/' +
        idVariable
    );
  }
  // enpoints reports

  getResports(): Observable<Report[]> {
    return this._http.get<Report[]>(this.baseUrl + '/reportes');
  }

  deleteReport(id: number): Observable<Report> {
    return this._http.delete<Report>(this.baseUrl + '/reportes/' + id);
  }

  addReport(report: any): Observable<Report> {
    return this._http.post<Report>(this.baseUrl + '/reportes', report);
  }

  getReportById(id: any): Observable<Report> {
    return this._http.get<Report>(this.baseUrl + '/reportes/' + id);
  }

  editReport(id: any, report: Report): Observable<Report> {
    return this._http.put<Report>(this.baseUrl + '/reportes/' + id, report);
  }
  // Centro de reportes------------------
  getReceivedReport(): Observable<ReceivedReport[]> {
    return this._http.get<ReceivedReport[]>(
      this.baseUrl + '/reportes/reportesRecibidos'
    );
  }
  getComment(idReport: number, idCenter: number): Observable<Comments[]> {
    return this._http.get<Comments[]>(
      this.baseUrl + '/comentarios/' + idReport + '/' + idCenter
    );
  }
  getDownloadExcel(idReport: number, idCenter: number): Observable<any> {
    return this._http.get(
      this.baseUrl + '/excel/descargaExcel/' + idReport + '/' + idCenter,
      {
        responseType: 'blob',
      }
    );
  }
  getReportPerCenter(idReport: number, idCenter: number): Observable<any> {
    return this._http.get(
      this.baseUrl + '/carga/reporteCreado/' + idReport + '/' + idCenter
    );
  }
  addComment(comment: comment): Observable<any> {
    return this._http.post(this.baseUrl + '/comentarios', comment, {
      responseType: 'text',
    });
  }
}
