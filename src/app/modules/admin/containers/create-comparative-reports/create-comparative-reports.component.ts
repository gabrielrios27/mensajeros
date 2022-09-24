import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-create-comparative-reports',
  templateUrl: './create-comparative-reports.component.html',
  styleUrls: ['./create-comparative-reports.component.scss'],
})
export class CreateComparativeReportsComponent implements OnInit {
  idCentro: number;
  reportsList: any;
  variablesList: any;
  report1: any;
  report2: any;
  selectedVariables: any;
  flagSelectAll: boolean;
  constructor(private route: Router, private rutaActiva: ActivatedRoute) {
    this.idCentro = this.getIdFromRute();
    this.reportsList = [];
    this.variablesList = [];
    this.report1 = {};
    this.report2 = {};
    this.flagSelectAll = false;
  }

  ngOnInit(): void {
    this.getReportsList();
    this.getVariablesInCommon(2, 3);
  }
  getReportsList() {
    this.reportsList = [
      { name: 'Reporte1', id: 1 },
      { name: 'Reporte2', id: 2 },
      { name: 'Reporte3', id: 3 },
      { name: 'Reporte4', id: 4 },
    ];
  }
  getVariablesInCommon(idReport1: number, idReport2: number) {
    this.variablesList = [
      { name: 'Variable1', id: 1 },
      { name: 'Variable2', id: 2 },
      { name: 'Variable3', id: 3 },
      { name: 'Variable4', id: 4 },
    ];
  }
  getIdFromRute(): number {
    let idToShow;
    this.rutaActiva.paramMap.subscribe((params: ParamMap) => {
      idToShow = params.get('id');
    });
    return Number(idToShow);
  }
  getReport1(value: any) {
    this.report1 = value;
  }
  getReport2(value: any) {
    this.report1 = value;
  }
  selectAll() {
    if (!this.flagSelectAll) {
      this.selectedVariables = this.variablesList;
      this.flagSelectAll = true;
    } else {
      this.selectedVariables = [];
      this.flagSelectAll = false;
    }
  }
}
