import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selecs-axes-variables',
  templateUrl: './selecs-axes-variables.component.html',
  styleUrls: ['./selecs-axes-variables.component.scss']
})
export class SelecsAxesVariablesComponent implements OnInit {

  variables: any;
  eje: any
  ejes: Array<any> = ["hola","pepe","jose"]

  constructor() { }

  ngOnInit(): void {
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
