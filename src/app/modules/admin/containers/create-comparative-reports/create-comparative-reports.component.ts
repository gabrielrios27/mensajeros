import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AdminService } from '../../services';
import { Subject, takeUntil } from 'rxjs';
import { ReportByCenter, VariableInCommon } from '../../models';

@Component({
  selector: 'app-create-comparative-reports',
  templateUrl: './create-comparative-reports.component.html',
  styleUrls: ['./create-comparative-reports.component.scss'],
})
export class CreateComparativeReportsComponent implements OnInit, OnDestroy {
  idCentro: number;
  reportsList: ReportByCenter[];
  variablesList: any;
  report1: ReportByCenter;
  report2: ReportByCenter;
  selectedVariables: any = [];
  flagSelectAll: boolean;
  selected1: number = -1;
  selected2: number = -1;
  // suscripciones
  onDestroy$: Subject<boolean> = new Subject();
  constructor(
    private route: Router,
    private rutaActiva: ActivatedRoute,

    private _adminSvc: AdminService
  ) {
    this.idCentro = this.getIdFromRute();
    this.reportsList = [];
    this.variablesList = [];
    this.report1 = {} as ReportByCenter;
    this.report2 = {} as ReportByCenter;
    this.flagSelectAll = false;
  }

  ngOnInit(): void {
    this.getReportsList();
  }
  getReportsList() {
    this._adminSvc
      .getReportByIdCenter(this.idCentro)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: ReportByCenter[]) => {
          this.reportsList = data;
        },
        error: (err) => {
          if (err.status === 401) {
            this.route.navigate(['/auth']);
          }
        },
      });
  }
  getVariablesInCommon(idReport1: number, idReport2: number) {
    // this.variablesList = [
    //   { name: 'Variable1', id: 1 },
    //   { name: 'Variable2', id: 2 },
    //   { name: 'Variable3', id: 3 },
    //   { name: 'Variable4', id: 4 },
    //   { name: 'Variable1', id: 5 },
    //   { name: 'Variable2', id: 6 },
    //   { name: 'Variable3', id: 7 },
    //   { name: 'Variable4', id: 8 },
    //   { name: 'Variable1', id: 9 },
    //   { name: 'Variable2', id: 10 },
    // ];
    this._adminSvc
      .getVariablesInCommon(idReport1, idReport2)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: VariableInCommon[]) => {
          this.variablesList = data;
          console.log('this.variablesList: ', this.variablesList);
        },
        error: (err) => {
          if (err.status === 401) {
            this.route.navigate(['/auth']);
          }
        },
      });
  }
  getIdFromRute(): number {
    let idToShow;
    this.rutaActiva.paramMap.subscribe((params: ParamMap) => {
      idToShow = params.get('id-centro');
    });
    return Number(idToShow);
  }

  getReport1(value: any) {
    this.report1 = value;
    if (this.report2.idReporte) {
      this.getVariablesInCommon(this.report1.idReporte, this.report2.idReporte);
    }
  }
  getReport2(value: any) {
    this.report2 = value;
    if (this.report1.idReporte) {
      this.getVariablesInCommon(this.report1.idReporte, this.report2.idReporte);
    }
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
  ngOnDestroy() {
    this.onDestroy$.next(true);
  }
}
