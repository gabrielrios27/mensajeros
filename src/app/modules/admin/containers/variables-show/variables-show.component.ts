import { Component, Input, OnInit } from '@angular/core';
import { VariableRep } from 'src/app/modules/user/models';
import { variable } from '../../models/admin.model';



@Component({
  selector: 'app-variables-show',
  templateUrl: './variables-show.component.html',
  styleUrls: ['./variables-show.component.scss']
})
export class VariablesShowComponent implements OnInit {
  @Input('indexAlphabet') indexAlphabet: string;
  @Input('variableValue') variableValue: VariableRep = {} as VariableRep;

  valueScale: Array<any> = []
  constructor() {
    this.indexAlphabet = 'A';
  }

  ngOnInit(): void {
    console.log(this.variableValue)
    this.createValueScale()
  }

  createValueScale() {
    for (
      let i = Number(this.variableValue.valor_inicial);
      i <= Number(this.variableValue.valor_final);
      i++
    ) {
      this.valueScale.push(i);
    }
  }

}
