import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserService } from '../../services';

@Component({
  selector: 'app-upload-reports',
  templateUrl: './upload-reports.component.html',
  styleUrls: ['./upload-reports.component.scss'],
})
export class UploadReportsComponent implements OnInit, OnDestroy {
  action: string;
  idReport: number;
  idCenter: number;
  reportToUpload: any;
  flagBtnGoBack: boolean = false;
  flagLastAxe: boolean = false;
  flagEndReport: boolean = false;
  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private userSvc: UserService
  ) {
    this.action = this.getActionFromRute('accion');
    console.log(this.action);

    this.idReport = this.getIdReportFromRute('idReporte');
    this.idCenter = this.getIdReportFromRute('idCentro');
  }

  ngOnInit(): void {}
  //OBTIENE LA ACCIÓN A REALIZAR DE LA RUTA
  getActionFromRute(action: string): string {
    let actionRoute: string | null = '';
    this.rutaActiva.paramMap.subscribe((params: ParamMap) => {
      actionRoute = params.get(action);
    });
    return actionRoute;
  }
  //OBTIENE EL ID DE LA VARIABLE EN LA RUTA
  getIdReportFromRute(nameId: string): number {
    let idToShow;
    this.rutaActiva.paramMap.subscribe((params: ParamMap) => {
      idToShow = params.get(nameId);
    });
    return Number(idToShow);
  }
  onCloseSave() {
    this.userSvc.sendClickSaveExit();
  }
  onConfirmAxe() {
    this.userSvc.sendClickEvent();
  }
  onGoBack() {
    this.userSvc.sendClickGoBack();
  }
  onGoBackLastAxe() {
    this.flagLastAxe = false;
    this.flagBtnGoBack = true;
  }
  onEndReport() {
    this.flagEndReport = true;
  }
  //Obtiene el reporte que se esta cargando en el componente report-upload
  getReportToUpload($event: any) {
    this.reportToUpload = $event;
  }
  getFlagBtnGoBack($event: boolean) {
    this.flagBtnGoBack = $event;
  }
  getFlagLastAxeEmit($event: boolean) {
    this.flagLastAxe = $event;
    this.flagBtnGoBack = false;
  }
  getFlagEndReportEmit($event: boolean) {
    this.flagEndReport = $event;
  }
  ngOnDestroy() {}
}
