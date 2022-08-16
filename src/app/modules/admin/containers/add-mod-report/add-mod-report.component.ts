import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';



@Component({
  selector: 'app-add-mod-report',
  templateUrl: './add-mod-report.component.html',
  styleUrls: ['./add-mod-report.component.scss']
})
export class AddModReportComponent implements OnInit {

  variables: any;
  eje: any
  ejes: Array<any> = ["hola","pepe","jose"]
  arrayc: Array<number> = [1]

  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  ngOnInit(): void {
    
  }

  createEje() {
   this.arrayc.push(1)
  }

  capturarVariables(e: any) {
    this.variables = e;
  }

  capturarEje(e: any) {
    this.eje = e
  }

  removeVariable(variable: any) {
    this.variables = this.variables.filter((res: any) => res !== variable);
  }
}
