import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-compare-variable',
  templateUrl: './compare-variable.component.html',
  styleUrls: ['./compare-variable.component.scss'],
})
export class CompareVariableComponent implements OnInit {
  @Input('variable') variable: any = {};
  @Input('index') index: string = 'A';
  valueScale: number[] = [];
  constructor() {}

  ngOnInit(): void {
    this.createValueScale();
  }
  createValueScale() {
    if (this.variable.escala_valor === 'true') {
      let lastValue: number = Number(this.variable.valor_final);
      let firstValue: number = Number(this.variable.valor_inicial);
      this.valueScale = [];
      for (let i = firstValue; i <= lastValue; i++) {
        this.valueScale.push(i);
      }
    }
  }
}
