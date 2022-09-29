import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
  selectedVariables: any = [];
  flagSelectAll: boolean;
  selected1: number = -1;
  selected2: number = -1;
  constructor(
    private route: Router,
    private rutaActiva: ActivatedRoute,
    private fb: FormBuilder
  ) {
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
      { name: 'Variable1', id: 5 },
      { name: 'Variable2', id: 6 },
      { name: 'Variable3', id: 7 },
      { name: 'Variable4', id: 8 },
      { name: 'Variable1', id: 9 },
      { name: 'Variable2', id: 10 },
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
    this.report2 = value;
  }
  selectAll() {
    if (!this.flagSelectAll) {
      this.selectedVariables = this.variablesList;
      this.flagSelectAll = true;
      console.log('this.selectedVariables:', this.selectedVariables);
    } else {
      this.selectedVariables = [];
      this.flagSelectAll = false;
      console.log('this.selectedVariables:', this.selectedVariables);
    }
  }
  selectOne() {
    if (this.flagSelectAll) {
      this.flagSelectAll = false;
    }
    if (this.selectedVariables.length === this.variablesList.length)
      this.flagSelectAll = true;
  }
  /*checkbox change event*/
  onChange1(i: number) {
    this.selected1 = i;
  }
  onChange2(i: number) {
    this.selected2 = i;
  }
  onCheckbox($event: any) {
    $event.preventDefault();
  }
  onNextBtn() {
    if (this.report1 && this.report2 && this.selectedVariables.length !== 0) {
      this.route.navigate([
        'admin/dashboard/centros/crear-informe-comparativo/' +
          this.idCentro +
          '/tabla-comparativa',
      ]);
    }
  }
}
