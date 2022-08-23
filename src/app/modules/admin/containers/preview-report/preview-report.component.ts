import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { axes, variable } from '../../models';
import { AdminService } from '../../services';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-preview-report',
  templateUrl: './preview-report.component.html',
  styleUrls: ['./preview-report.component.scss']
})
export class PreviewReportComponent implements OnInit {
  @Input() oldname = "";
  @Output() close = new EventEmitter<string>();
  newname = "";
  @Input() report: any
  name: any
  until: any
  since: any
  reportsd: any

  flag: boolean = false
  listOfAxes: Array<any> = []
  listOfVariables: Array<any> = []
  centers: Array<any> = []
  centers2: any
  centerSelects: Array<any> = []

  constructor(private router: Router, private admin: AdminService, private routeActiva: ActivatedRoute,
    private cdr: ChangeDetectorRef, public data: DataService) { }

  ngOnInit() {
    // copy all inputs to avoid polluting them
    this.newname = this.oldname;
    console.log(this.report)
    this.getCenters()
    this.getDataFromRute()
  }

  getCenters() {
    this.admin.getCentros().subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        this.centers = data;
        this.centerSelect()
        this.center2()
        console.log(data);
      },
      error: (err) => {
        setTimeout(() => this.cdr.detectChanges());
        console.log(err);
      },
    });
  }

  centerSelect() {
    if(this.data.arrayCenters == null)
    for (let item of this.centers) {
      for (let c of this.report.centros) {
        if (item.id == c) {
          console.log(item)
          this.centerSelects.push(item)
        }
      }
    }
    
  }
  center2(){
    console.log(this.centers2)
      for (let item of this.centers) {
      for (let ce of this.data.arrayCenters) {
        console.log(ce)
        if (item.id == ce) {
          console.log(item)
          this.centerSelects.push(item)
        }
      }
    }
  }

  getDataFromRute() {
    this.routeActiva.paramMap.subscribe((params: ParamMap) => {
      this.name = params.get("nombre");
      this.since = params.get("desde");
      this.until = params.get("hasta");
    });
  }


  ok() {
    this.close.emit(this.newname);
  }

  cancel() {
    this.close.emit(undefined);
  }
  backAddReport() {
    this.router.navigate(['admin/dashboard/reportes/creacion-de-reportes/add-mod-report'])
  }

  confirm() {
    this.flag = true
  }

  enviar() {
    this.setUserLocStg("algo", true)
    this.flag = false
    this.router.navigate(['/admin/dashboard/reportes/creacion-de-reportes']);
  }

  setUserLocStg(data: string, isNewUser: boolean) {
    localStorage.setItem('newOrEditedReport', data);
    localStorage.setItem('isNewReport', JSON.stringify(isNewUser));
  }
}
