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
    this.router.navigate(['/user/dashboard/mis-reportes/pendientes']);
  }
  onConfirmAxe() {
    // this.variableUpload.show();
    this.userSvc.sendClickEvent();
  }
  //Obtiene el reporte que se esta cargando en el componente report-upload
  getReportToUpload($event: any) {
    this.reportToUpload = $event;
  }
  getFlagBtnGoBack($event: boolean) {
    this.flagBtnGoBack = $event;
    console.log(this.flagBtnGoBack);
  }
  onGoBack() {}
  ngOnDestroy() {}
}
