import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AdminService } from '../../services';
import { Subject, takeUntil } from 'rxjs';
import {
  BodyComparativeReport,
  ReportByCenter,
  VariableInCommon,
} from '../../models';

@Component({
  selector: 'app-create-comparative-reports',
  templateUrl: './create-comparative-reports.component.html',
  styleUrls: ['./create-comparative-reports.component.scss'],
})
export class CreateComparativeReportsComponent implements OnInit, OnDestroy {
  idCentro: number;
  reportsList: ReportByCenter[];
  variablesList: VariableInCommon[];
  report1: ReportByCenter;
  report2: ReportByCenter;
  selectedVariables: VariableInCommon[] = [];
  flagSelectAll: boolean;
  selected1: number = -1;
  selected2: number = -1;
  flagTwoReportsSelected: boolean;
  flagNoVariables: boolean;
  flagBody: boolean;
  bodyComparativeReport: BodyComparativeReport;
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
    this.flagTwoReportsSelected = false;
    this.flagNoVariables = false;
    this.flagBody = false;
    this.bodyComparativeReport = {} as BodyComparativeReport;
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
          this.getBodySessionStg();
        },
        error: (err) => {
          if (err.status === 401) {
            this.route.navigate(['/auth']);
          }
        },
      });
  }
  getVariablesInCommon(idReport1: number, idReport2: number) {
    this._adminSvc
      .getVariablesInCommon(idReport1, idReport2)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: VariableInCommon[]) => {
          this.variablesList = data;
          if (this.flagBody) {
            this.setVariablesInSelect(this.bodyComparativeReport);
            this.flagBody = false;
          }
          if (this.variablesList.length !== 0) {
            this.flagTwoReportsSelected = true;
            this.flagNoVariables = false;
          } else {
            this.flagNoVariables = true;
            this.flagTwoReportsSelected = false;
          }
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
      this.flagSelectAll = false;
      this.getVariablesInCommon(this.report1.idReporte, this.report2.idReporte);
    }
  }
  getReport2(value: any) {
    this.report2 = value;
    if (this.report1.idReporte) {
      this.flagSelectAll = false;
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
    if (this.selectedVariables.length === this.variablesList.length) {
      this.flagSelectAll = true;
    }
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
      this.bodyComparativeReport = this.createBodyComparativeReport();
      this.setBodySessionStg(this.bodyComparativeReport);
      this.route.navigate([
        'admin/dashboard/centros/crear-informe-comparativo/' +
          this.idCentro +
          '/tabla-comparativa',
      ]);
    }
  }
  createBodyComparativeReport(): BodyComparativeReport {
    let body: BodyComparativeReport;
    body = {
      idCentro: this.idCentro,
      idReporte1: this.report1.idReporte,
      idReporte2: this.report2.idReporte,
      variables: this.selectedVariables.map((variable: any) => variable.id),
    };
    return body;
  }
  setBodySessionStg(body: BodyComparativeReport) {
    sessionStorage.setItem('bodyComparativeReport', JSON.stringify(body));
  }
  getBodySessionStg() {
    let bodyStr = sessionStorage.getItem('bodyComparativeReport');
    if (bodyStr) {
      this.bodyComparativeReport = JSON.parse(bodyStr);
      this.setReportInSelects(this.bodyComparativeReport);
    }
  }
  setReportInSelects(body: BodyComparativeReport) {
    this.report1 =
      this.reportsList.find(
        (report: ReportByCenter) => report.idReporte === body.idReporte1
      ) || ({} as ReportByCenter);

    this.report2 =
      this.reportsList.find(
        (report: ReportByCenter) => report.idReporte === body.idReporte2
      ) || ({} as ReportByCenter);
    this.flagTwoReportsSelected = true;
    this.flagBody = true;
    this.getVariablesInCommon(this.report1.idReporte, this.report2.idReporte);
  }
  setVariablesInSelect(body: BodyComparativeReport) {
    for (let id of body.variables) {
      this.variablesList.map((item: VariableInCommon) => {
        if (item.id === id) {
          this.selectedVariables.push(item);
        }
      });
    }
    this.selectOne();
  }
  ngOnDestroy() {
    this.onDestroy$.next(true);
  }
}
