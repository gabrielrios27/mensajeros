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
  @Input('response') response: Array<any> = [];
  @Input('index') index: any
  @Input('leng') leng: any
  valueScale: Array<any> = []
  responseToShow: any = {} as any
  constructor() {
    this.indexAlphabet = 'A';
  }

  ngOnInit(): void {
    this.createValueScale()
    this.responseShow()
  }

  responseShow(){
    for(let r of this.response){
      if(r.idVariable == this.variableValue.id){
        this.responseToShow = r
      }
    }
  }

  total(){
    return this.responseToShow.femenino + this.responseToShow.masculino + this.responseToShow.noBinario
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
