import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ReportToUpload } from '../../models';
import { UserService } from '../../services';
import { element } from 'protractor';

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
  axeSucces: boolean = false;
  prev = document.getElementById('prev');
  next = document.getElementById('next');
  circles: any;
  flag1 = false;
  flag3 = false;
  axes: Array<any> = [];
  currentActive: number = 1;
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
    if (this.axeSucces) {
      this.nextButton();
    }
    this.axeSucces = false;
  }
  onGoBack() {
    this.userSvc.sendClickGoBack();
    if (!this.axeSucces) {
      this.prevButton();
    }
    this.axeSucces = true;
  }
  onGoBackLastAxe() {
    this.flagLastAxe = false; //si el flagLastAxe está false entonces no está en la parte de envío de formulario
    this.flagBtnGoBack = true;
    this.userSvc.sendClickGoBackLastAxe();
    if (!this.axeSucces) {
      this.prevButton();
    }
  }
  onEndReport() {
    this.flagEndReport = true;
  }
  //Obtiene el reporte que se está cargando en el componente report-upload
  getReportToUpload($event: any) {
    this.reportToUpload = $event; //Aquí se devuelve el reporte que se esta cargando- con cantidad total de ejes y el eje actual-----------------------------------
    this.getaxes();
  }
  //obtiene el total de ejes y los carga en un arreglo para rederizarlo en la barra de progreso
  getaxes() {
    if (this.axes.length == 0) {
      for (let i = 0; i < this.reportToUpload.totalEjes; i++) {
        this.axes.push(i + 1);
      }
      if (this.reportToUpload.ejeActual-1 >= 1) {
        let progress = document.getElementById('progress') || undefined;
        this.currentActive = this.reportToUpload.ejeActual ;
        if (progress?.style.width != undefined) {
          progress.style.width = ((this.reportToUpload.ejeActual-1) / this.reportToUpload.totalEjes) *100 +'%';
          if (progress.style.width == 100 + '%') {
            this.flag3 = true;
          }
        }
      }
    }
    console.log(this.reportToUpload.ejeActual)
    // this.update()
  }

  getFlagBtnGoBack($event: boolean) {
    this.flagBtnGoBack = $event;
  }
  getFlagLastAxeEmit($event: boolean) {
    this.flagLastAxe = $event; //si el flagLastAxe está true entonces está en la parte final de envío de formulario
    this.flagBtnGoBack = false;
  }

  getFlagNextAxeEmit($event: boolean) {
    this.axeSucces = $event;
  }
  getFlagEndReportEmit($event: boolean) {
    this.flagEndReport = $event;
  }
  ngOnDestroy() {}

  // Barra de progreso

  nextButton() {
    this.circles = document.querySelectorAll('.circle');
    this.currentActive += 1;
    if (this.currentActive > this.circles.length) {
      this.currentActive = this.circles.length;
    }
    this.update();
  }

  prevButton() {
    this.circles = document.querySelectorAll('.circle');
    this.currentActive -= 1;
    if (this.currentActive < 1) {
      this.currentActive = 1;
      
    }
    this.flag3 = false;
    this.update();
  }

  update() {
    let progress = document.getElementById('progress') || undefined;
    this.circles.forEach((circle: any, idx: any) => {
      console.log(circle)
      if (idx < this.currentActive) {
        circle.classList.add('active');
      } else {
        circle.classList.remove('active');
      }
    });
    const actives = document.querySelectorAll('.active');
    if (progress?.style.width != undefined) {
      progress.style.width =
        ((actives.length - 1) / (this.circles.length - 1)) * 100 + '%';
      if (progress.style.width == 100 + '%') {
        this.flag3 = true;
      }
    }
  }
  //
}
