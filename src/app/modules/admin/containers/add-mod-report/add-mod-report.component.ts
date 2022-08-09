import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-add-mod-report',
  templateUrl: './add-mod-report.component.html',
  styleUrls: ['./add-mod-report.component.scss']
})
export class AddModReportComponent implements OnInit {

  variables: any;


  constructor() { }

  ngOnInit(): void {
  }

  capturarVariables(e: any) {
    this.variables = e;
  }
}
