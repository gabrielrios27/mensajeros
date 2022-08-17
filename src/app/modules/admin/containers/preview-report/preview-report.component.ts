import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview-report',
  templateUrl: './preview-report.component.html',
  styleUrls: ['./preview-report.component.scss']
})
export class PreviewReportComponent implements OnInit {

  centros: Array<any> = ["la balsa","h.san jose","casa 21"]
  desde: string = "01/07/2022"
  hasta: string = "31/12/2022"
  name:string = "123123123"
  variables: Array<any> = ["variable","variable","variable","variable"]
  ejes: Array<any> = ["seguridad alimentaria", "acompañamiento ", "psicologia"]

  constructor() { }

  ngOnInit(): void {
  }

}
