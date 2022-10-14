import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { isTemplateExpression } from 'typescript';
import {
  AxeWithVariables,
  BodyComparativeReport,
  ComparativeReports,
  variable,
} from '../../models';
import { Centro } from '../../models/centro';
import { AdminService } from '../../services';

@Component({
  selector: 'app-comparative-table',
  templateUrl: './comparative-table.component.html',
  styleUrls: ['./comparative-table.component.scss'],
})
export class ComparativeTableComponent implements OnInit, OnDestroy {
  axesList: AxeWithVariables[];
  alphabet: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  biAlphabet: string[] = [];
  idCentro: number;
  idReport: number | undefined;
  bodyComparativeReport: BodyComparativeReport;
  comparativeReports: ComparativeReports;
  center: Centro = {} as Centro;
  comment: string;
  flagIdReport: boolean;
  //suscripciones
  onDestroy$: Subject<boolean> = new Subject();
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private _adminSvc: AdminService
  ) {
    this.idCentro = 0;
    this.bodyComparativeReport = {} as BodyComparativeReport;
    this.comparativeReports = {} as ComparativeReports;
    this.axesList = [];
    this.comment = '';
    this.idReport = undefined;
    this.flagIdReport = false;
  }

  ngOnInit(): void {
    this.idCentro = this.getIdFromRute('id-centro');
    this.getCenter(this.idCentro);
    this.idReport = this.getIdFromRute('id-informe');
    if (this.idReport === 0) {
      this.getBodySessionStg();
      this.flagIdReport = false;
    } else {
      this.getReport(this.idReport);
      this.flagIdReport = true;
    }
    this.createBiAlphabet();
  }
  getIdFromRute(id: string): number {
    let idToShow;
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      idToShow = params.get(id);
    });
    return Number(idToShow);
  }
  getBodySessionStg() {
    let bodyStr = sessionStorage.getItem('bodyComparativeReport');
    if (bodyStr) {
      this.bodyComparativeReport = JSON.parse(bodyStr);
      this.getComparativeReport();
    }
  }
  getReport(id: number) {
    this._adminSvc
      .getComparativeReportByIdReport(id)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: ComparativeReports) => {
          this.comparativeReports = data;
          this.setResponseReports(this.comparativeReports);
        },
      });
  }
  getCenter(id: number) {
    this._adminSvc
      .getCenter(id)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: Centro) => {
          this.center = data;
        },
      });
  }
  getComparativeReport() {
    this._adminSvc
      .createPreviewComparativeReport(this.bodyComparativeReport)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: ComparativeReports) => {
          this.comparativeReports = data;
          this.setResponseReports(this.comparativeReports);
        },
      });
  }
  createComparativeReport(body: BodyComparativeReport) {
    this._adminSvc
      .createComparativeReport(body)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: ComparativeReports) => {
          this.setFlagSessionStg(true);
          sessionStorage.removeItem('bodyComparativeReport');
        },
        complete: () => {
          this.router.navigate(['admin/dashboard/centros']);
        },
      });
  }
  setResponseReports(report: ComparativeReports) {
    report.carga1.variables.map((variable) => {
      variable.report1 = report.carga1.respuestas.find(
        (resp) => resp.idVariable === variable.id
      );
      variable.report2 = report.carga2.respuestas.find(
        (resp) => resp.idVariable === variable.id
      );
    });
    this.createAxesList(report.carga1.variables);
  }
  createAxesList(variables: variable[]) {
    for (let variableItem of variables) {
      if (
        this.axesList.length === 0 ||
        this.axesList.find(
          (item: AxeWithVariables) => item.id === variableItem.eje.id
        ) === undefined
      ) {
        let newAxe: AxeWithVariables = {
          id: variableItem.eje.id,
          nombre: variableItem.eje.nombre,
          variablesList: variables.filter(
            (item: variable) => item.eje.id === variableItem.eje.id
          ),
        };
        this.axesList.push(newAxe);
      }
    }
  }
  //crea un indice de alfabeto doble
  createBiAlphabet() {
    let i;
    this.biAlphabet = [];
    for (i = 0; i < 26; i++) {
      this.biAlphabet.push(this.alphabet[i]);
    }
    i++;
    for (let character1 of this.alphabet) {
      for (let character2 of this.alphabet) {
        if (i < 677) {
          this.biAlphabet.push(character1 + character2);
          i++;
        }
      }
    }
  }
  onGoBack() {
    this.router.navigate([
      'admin/dashboard/centros/crear-informe-comparativo/' + this.idCentro,
    ]);
  }
  onGoBackList() {
    this.router.navigate([
      'admin/dashboard/centros/ver-informes-comparativo/' + this.idCentro,
    ]);
  }
  onCreateReport() {
    this.bodyComparativeReport.descripcion = this.comment;
    this.createComparativeReport(this.bodyComparativeReport);
  }
  setFlagSessionStg(flag: boolean) {
    sessionStorage.setItem('createdComparativeReport', JSON.stringify(flag));
  }
  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
}
