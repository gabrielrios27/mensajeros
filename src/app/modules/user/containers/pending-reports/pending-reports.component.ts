import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending-reports',
  templateUrl: './pending-reports.component.html',
  styleUrls: ['./pending-reports.component.scss'],
})
export class PendingReportsComponent implements OnInit {
  list: any = [
    {
      numberReport: 'C00010',
      center: 'Colibries',
      period: '07/2021-12/2121',
      limitDate: '02/01/2022',
    },
    {
      numberReport: 'C00011',
      center: 'La Balsa',
      period: '07/2021-12/2121',
      limitDate: '02/01/2022',
    },
    {
      numberReport: 'C00012',
      center: 'La Balsa',
      period: '07/2021-12/2121',
      limitDate: '02/01/2022',
    },
    {
      numberReport: 'C00013',
      center: 'Colibries',
      period: '07/2021-12/2121',
      limitDate: '02/01/2022',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
  onStartReport() {}
}
