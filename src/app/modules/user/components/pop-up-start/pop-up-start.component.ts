import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pop-up-start',
  templateUrl: './pop-up-start.component.html',
  styleUrls: ['./pop-up-start.component.scss'],
})
export class PopUpStartComponent implements OnInit {
  constructor(private router: Router) {}
  @Input('idReport') idReport: number = 0;
  @Input('idCentro') idCentro: number = 0;
  ngOnInit(): void {}
  initReport() {
    this.router.navigate([
      'user/dashboard/mis-reportes/pendientes/carga-de-reporte/' +
        this.idReport +
        '/' +
        this.idCentro,
    ]);
  }
}
