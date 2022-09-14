import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { axes, variable } from '../../models';
import { AdminService } from '../../services';
import { DataService } from '../../services/data.service';
import { report } from 'process';
import { Report } from '../../models/report';
import { Centro } from '../../models/centro';

@Component({
  selector: 'app-preview-report',
  templateUrl: './preview-report.component.html',
  styleUrls: ['./preview-report.component.scss'],
})
export class PreviewReportComponent implements OnInit {
  @Input() oldname = '';
  @Output() close = new EventEmitter<string>();
  newname = '';
  @Input() report: any;
  name: any;
  until: any;
  since: any;
  deliverdate: any;
  reportsd: any;

  variables2: Array<number> = [];
  variables: Array<number> = [];
  flag: boolean = false;
  listOfAxes: Array<any> = [];
  listOfVariables: Array<any> = [];
  centers: Array<any> = [];
  centers2: any;
  centerSelects: Array<any> = [];

  constructor(
    private router: Router,
    private admin: AdminService,
    private routeActiva: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    public data: DataService
  ) {}

  ngOnInit() {
    this.newname = this.oldname;

    this.getCenters();
    this.getDataFromService();
  }

  getCenters() {
    this.admin.getCentros().subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        this.centers = data;
        this.centerSelect();
        this.center2();
      },
      error: (err) => {
        setTimeout(() => this.cdr.detectChanges());
      },
    });
  }

  //busca centros selecccionados centros que vienen por output en modal
  centerSelect() {
    if (this.data.arrayCenters == null)
      for (let item of this.centers) {
        for (let c of this.report.centros) {
          if (item.id == c) {
            this.centerSelects.push(item);
          }
        }
      }
  }
  //
  // busca centros selecccionados que vienen por service data
  center2() {
    for (let item of this.centers) {
      for (let ce of this.data.arrayCenters) {
        if (item.id == ce) {
          this.centerSelects.push(item);
        }
      }
    }
  }
  //

  variablesse(item: any): any {
    return this.report.variable.filter((res: any) => res.eje.id === item.id);
  }

  // gets data from service
  getDataFromService() {
    this.name = this.data.report?.nombre;
    this.until = this.data.report?.periodoHasta;
    this.since = this.data.report?.periodoDesde;
    this.deliverdate = this.data.report?.fechaEntrega;
    this.deliverdate = new Date(this.deliverdate);
    this.since = new Date(this.since);
    this.until = new Date(this.until);
  }
  //

  ok() {
    this.close.emit(this.newname);
  }

  cancel() {
    this.close.emit(undefined);
  }
  backAddReport() {
    if (this.data.editar) {
      this.router.navigate([
        'admin/dashboard/reportes/creacion-de-reportes/add-mod-report',
        this.data.report?.id
      ]);
    } else {
      this.router.navigate([
        'admin/dashboard/reportes/creacion-de-reportes/add-mod-report',
      ]);
    }
  }

  confirm() {
    this.flag = true;
  }

  editar() {
    // this.setUserLocStg("algo", true)
    this.flag = false;
    // this.router.navigate(['/admin/dashboard/reportes/creacion-de-reportes']);

    for (let varia of this.data.arrayVariables) {
      for (let vari of varia) {
        this.variables.push(vari.id);
      }
    }

    let today = new Date();

    let report: Report = {
      nombre: this.name,
      fechaCreacion: '',
      fechaEntrega: this.deliverdate.toISOString(),
      periodoDesde: this.since.toISOString(),
      periodoHasta: this.until.toISOString(),
      variables: this.variables,
      centros: this.data.arrayCenters,
      id: '',
    };
    this.setReportLocStg(this.name, false);
    this.admin.editReport(this.data.report?.id, report).subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        this.data.flag = false;
        this.data.editar = false;
        this.router.navigate(['admin/dashboard/reportes/creacion-de-reportes']);
      },
      error: (err) => {},
    });
  }

  enviar() {
    // this.setUserLocStg("algo", true)
    this.flag = false;
    // this.router.navigate(['/admin/dashboard/reportes/creacion-de-reportes']);

    for (let varia of this.data.arrayVariables) {
      for (let vari of varia) {
        this.variables.push(vari.id);
      }
    }

    let today = new Date();

    let report: Report = {
      nombre: this.name,
      fechaCreacion: today.toISOString(),
      fechaEntrega: this.deliverdate.toISOString(),
      periodoDesde: this.since.toISOString(),
      periodoHasta: this.until.toISOString(),
      variables: this.variables,
      centros: this.data.arrayCenters,
      id: '',
    };
    this.setReportLocStg(this.name, true);
    this.admin.addReport(report).subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        this.data.flag = false;
        this.data.editar = false;
        this.router.navigate(['admin/dashboard/reportes/creacion-de-reportes']);
      },
      error: (err) => {},
    });
  }

  setReportLocStg(data: string, isNewReport: boolean) {
    localStorage.setItem('newOrEditedReport', data);
    localStorage.setItem('isNewReport', JSON.stringify(isNewReport));
  }
}
