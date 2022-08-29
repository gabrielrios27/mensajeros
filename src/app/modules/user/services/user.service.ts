import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UserService {
  private subject = new Subject<any>();
  private subjectSaveExit = new Subject<any>();
  private subjectGoBack = new Subject<any>();
  constructor() {}
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
}
