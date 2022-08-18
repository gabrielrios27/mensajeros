import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { flag } from '../../models/admin.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview-report',
  templateUrl: './preview-report.component.html',
  styleUrls: ['./preview-report.component.scss']
})
export class PreviewReportComponent implements OnInit {
  @Input() oldname = "";
  @Output() close = new EventEmitter<string>();
  newname = "";
  flag: boolean = false

  centros: Array<any> = ["la balsa", "h.san jose", "casa 21"]
  desde: string = "01/07/2022"
  hasta: string = "31/12/2022"
  name: string = "123123123"
  variables: Array<any> = ["variable", "variable", "variable", "variable"]
  ejes: Array<any> = ["seguridad alimentaria", "acompañamiento ", "psicologia"]

  constructor(private router: Router) { }

  ngOnInit() {
    // copy all inputs to avoid polluting them
    this.newname = this.oldname;
    
  }

  ok() {
    this.close.emit(this.newname);
  }

  cancel() {
    this.close.emit(undefined);
  }
  backAddReport(){
    this.router.navigate(['admin/dashboard/reportes/creacion-de-reportes/add-mod-report'])
  }

  confirm(){
    this.flag = true
  }

  enviar(){
    this.setUserLocStg("algo", true)
    this.flag = false
    this.router.navigate(['/admin/dashboard/reportes/creacion-de-reportes']);
  }

  setUserLocStg(data: string, isNewUser: boolean) {
    localStorage.setItem('newOrEditedReport', data);
    localStorage.setItem('isNewReport', JSON.stringify(isNewUser));
  }
}
