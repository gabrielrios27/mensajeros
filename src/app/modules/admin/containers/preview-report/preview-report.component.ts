import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  deliverdate: any
  reportsd: any

  variables2: Array<number> = []
  flag: boolean = false
  listOfAxes: Array<any> = []
  listOfVariables: Array<any> = []
  centers: Array<any> = []
  centers2: any
  centerSelects: Array<any> = []

  constructor(private router: Router, private admin: AdminService, private routeActiva: ActivatedRoute,
    private cdr: ChangeDetectorRef, public data: DataService) { }

  ngOnInit() {
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


  //busca centros selecccionados centros que vienen por output en modal
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
  // 
  // busca centros selecccionados que vienen por service data
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
  // 

  getDataFromRute() {
    this.routeActiva.paramMap.subscribe((params: ParamMap) => {
      this.name = params.get("nombre");
      this.since = params.get("desde");
      this.until = params.get("hasta");
      this.deliverdate = params.get('deliverdate')
    });
    this.until = new Date(this.until)
    this.since =new Date(this.since) 
    this.deliverdate = new Date(this.deliverdate)
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
    // this.setUserLocStg("algo", true)
    this.flag = false
    this.router.navigate(['/admin/dashboard/reportes/creacion-de-reportes']);
    
    for(let axe of this.data.arrayAxes){
      for(let vari of this.data.arrayVariables[this.data.arrayAxes.indexOf(axe)]){
        this.variables2.push( vari.id)
      }
    }

    let today = new Date()
    
    let report: Report ={
      nombre : this.name,
      fechaCreacion :today.toISOString(),
      fechaEntrega: this.deliverdate.toISOString(),
      periodoDesde: this.since.toISOString(),
      periodoHasta: this.until.toISOString(),
      variables : this.variables2,
      centros: this.data.arrayCenters,
      id: ''
    }
    console.log(report)
    this.admin.addReport(report).subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges())
        console.log(data, "admin")
        this.data.flag = false
        this.data.editar = false
        this.setUserLocStg(this.name, true)
        this.router.navigate(['admin/dashboard/reportes/creacion-de-reportes']);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  setUserLocStg(data: string, isNewReport: boolean) {
    localStorage.setItem('newOrEditedReport', data);
    localStorage.setItem('isNewReport', JSON.stringify(isNewReport));
  }
}
