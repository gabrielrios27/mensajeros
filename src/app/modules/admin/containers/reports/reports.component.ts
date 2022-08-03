import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  id: number
  numero: string,
  fechaCreacion: Date
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1 ,numero: 'reporte 1', fechaCreacion: new Date},
  {id: 2 ,numero: 'reporte 2', fechaCreacion: new Date}
];


@Component({
  selector: 'app-reports',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reports.component.html',
  styleUrls: ['reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  numero: any
  reports = ELEMENT_DATA;

  constructor() {}

  ngOnInit() {
    this.reports = ELEMENT_DATA;
  }

  busca(e: string) {

    if (e.toLocaleLowerCase() == '') {
      this.ngOnInit()
    }
    else {
      this.reports = this.reports.filter(res => {
        return res.numero.toLocaleLowerCase().match(this.numero.toLocaleLowerCase())
      })
    }

  }

  create(){

  }

  edit(report: PeriodicElement){

  }

  onClickDelete(id:number){

  }
}
