import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-upload-reports',
  templateUrl: './upload-reports.component.html',
  styleUrls: ['./upload-reports.component.scss'],
})
export class UploadReportsComponent implements OnInit, OnDestroy {
  idReport: number;
  constructor(private rutaActiva: ActivatedRoute, private router: Router) {
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
  ngOnDestroy() {}
}
