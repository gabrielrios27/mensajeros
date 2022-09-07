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
  flagLastAxe: boolean = false;
  axeSucces: boolean = false
  prev = document.getElementById('prev');
  next = document.getElementById('next');
  circles: any;
  flag1 = false;
  flag2 = false;
  flag3 = false;
  items = [1,2,3]
  currentActive: number = 1;
  flagEndReport: boolean = false;
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
    if(this.axeSucces){
      this.nextButton()
    }
    this.axeSucces = false
  }
  onGoBack() {
    this.userSvc.sendClickGoBack();
    if(!this.axeSucces){
      this.prevButton()
    }
    this.axeSucces = true
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

  getFlagNextAxeEmit($event: boolean){
    this.axeSucces = $event
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
      this.flag1 = true;
      this.currentActive = this.circles.length;
    }
    console.log('current', this.currentActive);
    this.update();
  }

  prevButton() {
    this.currentActive -= 1;
    if (this.currentActive < 1) {
      this.currentActive = 1;
      this.flag1 = false;
      console.log('current', this.currentActive);
    }
    console.log('current', this.currentActive);
    this.update();
  }

  update() {
    let progress = document.getElementById('progress') || undefined;
    
    console.log(this.circles.length);
    this.circles.forEach((circle: any, idx: any) => {
      console.log(idx);
      if (idx < this.currentActive) {
        circle.classList.add('active');
      } else {
        circle.classList.remove('active');
      }
    });
    const actives = document.querySelectorAll('.active');
    if (progress?.style.width != undefined) {
      progress.style.width = ((actives.length-1) / (this.circles.length - 1)) * 100 + '%';
    }
    console.log(this.currentActive)
    switch(this.currentActive){
      case 3 :{
        this.flag1 = true
        break;
      }
      case 4:{
        this.flag2 = true
        break;
      }
      case 5:{
        this.flag3 = true
        break;
      }
    }
  }
  // 
}
