import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { UserService } from '../../services';

@Component({
  selector: 'app-upload-reports',
  templateUrl: './upload-reports.component.html',
  styleUrls: ['./upload-reports.component.scss'],
})
export class UploadReportsComponent implements OnInit, OnDestroy {
  idReport: number;
  reportToUpload: any;
  flagBtnGoBack: boolean = false;
  flagLastAxe: boolean = true;
  flagEndReport: boolean = true;
  constructor(
    private rutaActiva: ActivatedRoute,
    private router: Router,
    private userSvc: UserService
  ) {
    this.idReport = this.getIdFromRute();
  }

  ngOnInit(): void {}
  //OBTIENE EL ID DE LA VARIABLE EN LA RUTA
  getIdFromRute(): number {
    let idToShow;
    this.rutaActiva.paramMap.subscribe((params: ParamMap) => {
      idToShow = params.get('id');
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
    // this.router.navigate(['/user/dashboard/mis-reportes/pendientes']);
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
