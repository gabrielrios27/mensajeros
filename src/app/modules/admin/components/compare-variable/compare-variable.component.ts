import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-compare-variable',
  templateUrl: './compare-variable.component.html',
  styleUrls: ['./compare-variable.component.scss'],
})
export class CompareVariableComponent implements OnInit {
  @Input('variable') variable: any = {};
  @Input('index') index: string = 'A';
  constructor() {}

  ngOnInit(): void {}
}
