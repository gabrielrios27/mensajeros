import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ReportRecived } from '../../models/reportRecived';
import { AdminService } from '../../services';
import { Centro } from '../../models/centro';
import { axes } from '../../models';
import { comment } from '../../models/comment';
@Component({
  selector: 'app-received-report',
  templateUrl: './received-report.component.html',
  styleUrls: ['./received-report.component.scss'],
})
export class ReceivedReportComponent implements OnInit {
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

  id: any;
  centerId: any;
  leng: any;
  axes: any = [];
  since: any;
  until: any;
  observ = '';
  report: ReportRecived = {} as ReportRecived;
  center: Centro = {} as Centro;
  listOfAxes: any;
  comments: any = [];
  constructor(
    private router: Router,
    private admin: AdminService,
    private cdr: ChangeDetectorRef,
    private routeActive: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createBiAlphabet();
    this.getDataFromRute();
    this.getReport();
  }

  addComment() {
    let comment: comment;
    comment = {
      observacion: this.observ,
      idReporte: {
        id: this.id,
      },
      idCentro: {
        id: this.centerId,
      },
    };
    this.admin.addComment(comment).subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        this.router.navigate(['admin/dashboard/reportes/centro-de-reportes']);
      },
      error: (err) => {
        setTimeout(() => this.cdr.detectChanges());
      },
    });
  }

  backToReports() {
    this.router.navigate(['admin/dashboard/reportes/centro-de-reportes']);
  }

  getDataFromRute() {
    this.routeActive.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id-report');
      this.centerId = params.get('id-center');
    });
  }

  dates(): any {
    this.since = new Date(this.report.periodoDesde).toLocaleDateString();
    this.until = new Date(this.report.periodoHasta).toLocaleDateString();
    let date = new Date(this.report.fechaCompletado);
    return date.toLocaleDateString();
  }

  getCenter(id: number) {
    this.admin.getCenter(id).subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        this.center = data;
        this.getAxes();
      },
      error: (err) => {
        setTimeout(() => this.cdr.detectChanges());
      },
    });
  }

  getReport() {
    this.admin.getReportPerCenter(this.id, this.centerId).subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        this.report = data;
        this.getCenter(data.idCentro);
      },
      error: (err) => {
        setTimeout(() => this.cdr.detectChanges());
        if (err.status === 401) {
          this.router.navigate(['/auth']);
        }
      },
    });
  }

  getAxes() {
    this.admin.getAxes().subscribe({
      next: (data: axes[]) => {
        this.listOfAxes = data;
        this.pushAxe();
        this.getComment();
        setTimeout(() => this.cdr.detectChanges());
      },
      error: (err) => {
        if (err.status === 401) {
          this.router.navigate(['/auth']);
        }
      },
      complete: () => {},
    });
  }

  getComment() {
    this.admin.getComment(this.id, this.centerId).subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        this.comments = data;
      },
      error: (err) => {
        setTimeout(() => this.cdr.detectChanges());
      },
    });
  }

  pushAxe() {
    let axe: any = [];
    for (let vari of this.report.variables) {
      if (!axe.includes(vari.eje.id)) {
        axe.push(vari.eje.id);
      }
    }
    axe.forEach((element: any) => {
      this.axes.push(this.listOfAxes.find((res: any) => res.id == element));
    });
  }

  variablesShow(axe: any): any {
    let vari = this.report.variables.filter((res) => {
      return axe.id == res.eje.id;
    });
    this.leng = vari.length;
    return this.report.variables.filter((res) => {
      return axe.id == res.eje.id;
    });
  }

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
}
