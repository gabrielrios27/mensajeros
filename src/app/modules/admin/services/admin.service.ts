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
  baseUrl: string = 'https://mensajeros-back-martin.herokuapp.com';
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
    return this._http.put<Centro>(this.baseUrlTami + '/centros/' + id, center, {
      headers: this.headers,
    });
  }

  addCenter(center: Centro): Observable<Centro> {
    return this._http.post<Centro>(this.baseUrlTami + '/centros', center, {
      headers: this.headers,
    });
  }

  deleteCenter(id: number): Observable<boolean> {
    return this._http.delete<boolean>(this.baseUrlTami + '/centros/' + id, {
      headers: this.headers,
    });
  }

  getCenter(id: number): Observable<Centro> {
    return this._http.get<Centro>(this.baseUrlTami + '/centros/' + id);
  }

  getCentros(): Observable<Centro[]> {
    return this._http.get<Centro[]>(this.baseUrlTami + '/centros');
  }
  //reportes comparativos
  getReportByIdCenter(id: number): Observable<ReportByCenter[]> {
    return this._http.get<ReportByCenter[]>(
      this.baseUrlTami + '/reportes/reporteSegunCentro/' + id
    );
  }
  getVariablesInCommon(
    idReport1: number,
    idReport2: number
  ): Observable<VariableInCommon[]> {
    return this._http.get<VariableInCommon[]>(
      this.baseUrlTami +
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
      this.baseUrlTami + '/informes/preview',
      body
    );
  }
  createComparativeReport(
    body: BodyComparativeReport
  ): Observable<ComparativeReports> {
    return this._http.post<ComparativeReports>(
      this.baseUrlTami + '/informes',
      body
    );
  }
  //ver informes comparativos
  getComparativeReportByIdReport(id: number): Observable<ComparativeReports> {
    return this._http.get<ComparativeReports>(
      this.baseUrlTami + '/informes/' + id
    );
  }
  getComparativeReportsByIdCenter(
    id: number
  ): Observable<CreatedComparativeReport[]> {
    return this._http.get<CreatedComparativeReport[]>(
      this.baseUrlTami + '/informes/centro/' + id
    );
  }
  deleteComparativeReport(id: number): Observable<boolean> {
    return this._http.delete<boolean>(this.baseUrlTami + '/informes/' + id);
  }
  // endpoints user

  getUsers(): Observable<Users[]> {
    return this._http.get<Users[]>(this.baseUrlTami + '/usuarios');
  }

  addUser(user: Users, id: number): Observable<any> {
    return this._http.post(this.baseUrlTami + '/usuarios/' + id, user, {
      responseType: 'text',
    });
  }
  addUserAdmin(user: Users): Observable<Users> {
    return this._http.post<Users>(this.baseUrlTami + '/auth/agregar', user);
  }
  deleteUser(id: number): Observable<boolean> {
    return this._http.delete<boolean>(this.baseUrlTami + '/usuarios/' + id);
  }

  editUser(user: Users, id: any): Observable<Response> {
    return this._http.put<Response>(this.baseUrlTami + '/usuarios/' + id, user);
  }

  getUser(id: number): Observable<Users> {
    return this._http.get<Users>(this.baseUrlTami + '/usuarios/' + id);
  }
  //obtener log de actividades
  getActivityLogByIdUser(id: number): Observable<Activity[]> {
    return this._http.get<Activity[]>(this.baseUrlTami + '/logs/' + id);
  }

  // endpoints axes

  getAxes(): Observable<axes[]> {
    return this._http.get<axes[]>(this.baseUrlTami + this.EPAxes);
  }
  getAxeWithId(id: string): Observable<axes> {
    return this._http.get<axes>(this.baseUrlTami + this.EPAxes + '/' + id);
  }
  editAxeWithId(id: string, body: any): Observable<axes> {
    return this._http.put<axes>(
      this.baseUrlTami + this.EPAxes + '/' + id,
      body
    );
  }
  createAxe(body: any): Observable<axes> {
    return this._http.post<axes>(this.baseUrlTami + this.EPAxes, body);
  }
  deleteAxeWithId(id: string): Observable<any> {
    return this._http.delete<axes>(this.baseUrlTami + this.EPAxes + '/' + id);
  }
  //
  // Variables-----------------
  getVariablesQuantityPerAxe(): Observable<AxeWithquantity[]> {
    return this._http.get<AxeWithquantity[]>(
      this.baseUrlTami + this.EPVariablesQuantityPerAxe
    );
  }

  getCenterPerVariables(idVariable: number): Observable<Centro[]> {
    return this._http.get<Centro[]>(
      this.baseUrlTami + '/centros/segunVariable/' + idVariable
    );
  }

  getVariables(): Observable<variable[]> {
    return this._http.get<variable[]>(this.baseUrlTami + this.EPVariables);
  }

  getVariablesGroup(id: string): Observable<variable[]> {
    return this._http.get<variable[]>(
      this.baseUrlTami + this.EPVariablesQuantityPerAxe + '/' + id
    );
  }
  getVariableWithId(id: string): Observable<variable> {
    return this._http.get<variable>(
      this.baseUrlTami + this.EPVariables + '/' + id
    );
  }
  editVariableWithId(id: string, body: any): Observable<variable> {
    return this._http.put<variable>(
      this.baseUrlTami + this.EPVariables + '/' + id,
      body
    );
  }
  createVariable(body: any): Observable<variable> {
    return this._http.post<variable>(this.baseUrlTami + this.EPVariables, body);
  }
  deleteVariableWithId(id: string): Observable<any> {
    return this._http.delete<variable>(
      this.baseUrlTami + this.EPVariables + '/' + id
    );
  }

  getEvolutionOfVariable(
    idCenter: number,
    idVariable: number
  ): Observable<evolutionVariable[]> {
    return this._http.get<evolutionVariable[]>(
      this.baseUrlTami +
        '/variables/evolucionVariable/' +
        idCenter +
        '/' +
        idVariable
    );
  }
  // enpoints reports

  getResports(): Observable<Report[]> {
    return this._http.get<Report[]>(this.baseUrlTami + '/reportes');
  }

  deleteReport(id: number): Observable<Report> {
    return this._http.delete<Report>(this.baseUrlTami + '/reportes/' + id);
  }

  addReport(report: any): Observable<Report> {
    return this._http.post<Report>(this.baseUrlTami + '/reportes', report);
  }

  getReportById(id: any): Observable<Report> {
    return this._http.get<Report>(this.baseUrlTami + '/reportes/' + id);
  }

  editReport(id: any, report: Report): Observable<Report> {
    return this._http.put<Report>(this.baseUrlTami + '/reportes/' + id, report);
  }
  // Centro de reportes------------------
  getReceivedReport(): Observable<ReceivedReport[]> {
    return this._http.get<ReceivedReport[]>(
      this.baseUrlTami + '/reportes/reportesRecibidos'
    );
  }
  getComment(idReport: number, idCenter: number): Observable<Comments[]> {
    return this._http.get<Comments[]>(
      this.baseUrlTami + '/comentarios/' + idReport + '/' + idCenter
    );
  }
  getDownloadExcel(idReport: number, idCenter: number): Observable<any> {
    return this._http.get(
      this.baseUrlTami + '/excel/descargaExcel/' + idReport + '/' + idCenter,
      {
        responseType: 'blob',
      }
    );
  }
  getReportPerCenter(idReport: number, idCenter: number): Observable<any> {
    return this._http.get(
      this.baseUrlTami + '/carga/reporteCreado/' + idReport + '/' + idCenter
    );
  }
  addComment(comment: comment): Observable<any> {
    return this._http.post(this.baseUrlTami + '/comentarios', comment, {
      responseType: 'text',
    });
  }
}
