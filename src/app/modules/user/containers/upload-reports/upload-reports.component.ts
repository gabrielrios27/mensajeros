import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ReportToUpload } from '../../models';
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
  // Para obtener datos para barra de progreso
  reportToUpload: ReportToUpload; //De reportToUpload obtener eje actual y cantidad de ejes
  flagLastAxe: boolean = false; //cuando FlagLastAxe es true significa que el usuario esta en la ultima pantalla, la de envio de reporte
  // --------------
  flagBtnGoBack: boolean = false;
  flagEndReport: boolean = false;
  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private userSvc: UserService
  ) {
    this.action = this.getActionFromRute('accion');
    this.idReport = this.getIdReportFromRute('idReporte');
    this.idCenter = this.getIdReportFromRute('idCentro');
    this.reportToUpload = {} as ReportToUpload;
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
    this.flagLastAxe = false; //si el flagLastAxe está false entonces no está en la parte de envío de formulario
    this.flagBtnGoBack = true;
    this.userSvc.sendClickGoBackLastAxe();
  }
  onEndReport() {
    this.flagEndReport = true;
  }
  //Obtiene el reporte que se está cargando en el componente report-upload
  getReportToUpload($event: any) {
    this.reportToUpload = $event; //Aquí se devuelve el reporte que se esta cargando- con cantidad total de ejes y el eje actual-----------------------------------
  }
  getFlagBtnGoBack($event: boolean) {
    this.flagBtnGoBack = $event;
  }
  getFlagLastAxeEmit($event: boolean) {
    this.flagLastAxe = $event; //si el flagLastAxe está true entonces está en la parte final de envío de formulario
    this.flagBtnGoBack = false;
  }
  getFlagEndReportEmit($event: boolean) {
    this.flagEndReport = $event;
  }
  ngOnDestroy() {}
}
