import { Component, OnInit } from '@angular/core';
import { flag } from '../../models/admin.model';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexYAxis,
  ApexGrid,
  ApexMarkers
} from "ng-apexcharts";


@Component({
  selector: 'app-evolution-of-variable',
  templateUrl: './evolution-of-variable.component.html',
  styleUrls: ['./evolution-of-variable.component.scss']
})
export class EvolutionOfVariableComponent implements OnInit {

  series: ApexAxisChartSeries = {} as ApexAxisChartSeries
  chart: ApexChart = {} as ApexChart
  title: ApexTitleSubtitle = {} as ApexTitleSubtitle
  xaxis: ApexXAxis = {} as ApexXAxis
  yaxis: ApexYAxis = {} as ApexYAxis
  markers: ApexMarkers = {} as ApexMarkers
  colors: any;
  stroke: ApexStroke = {} as ApexStroke
  grid: ApexGrid = {} as ApexGrid

  categories: Array<string> = [
    "Enero",
    "Febrero",
    "Marzo",
    "April",
    "Mayo",
    "Junio",
    "Julio",
    "Augosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ]
  datas: Array<number> = [10, 41, 35, 51, 49, 62, 69, 91, 148]
  max = 12
  min = 0
  rango = 11
  flagMon = true
  flagSemi = false
  flagAnnual = false
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  
  constructor() {
    this.init()
  }

  private init(): void {
    this.title = {
      text: ""
    };

    this.series = [
      {
        name: "Cantidad de participantes",
        data: this.datas
      }
    ],
      this.grid = {

        borderColor: "black"
      },

      this.chart = {
        type: 'line',
        width: 850,

      },
      this.xaxis = {
        type: 'category',
        range: this.rango,
        min: 0,
        max: this.max,
        categories: this.categories,
        axisBorder: {
          show: false,
        },
      },
      this.markers = {
        size: 5,
        shape: "square",
        radius: 0,
        colors: ['#1967D2'],
        strokeColors: '#1967D2',
      }
    this.colors = ["#1967D2"],
      this.stroke = {
        width: 3

      },
      this.yaxis = {
        min: this.min,
        labels: {
          offsetX: 0,
          offsetY: 0,
          formatter: function (val) {
            return "Mas de " + val;
          }
        }
      }


  }


  ngOnInit(): void {
  }

  monthly() {

    if (!this.flagMon) {
      this.flagMon = true
      this.flagSemi = false
      this.flagAnnual = false
      this.categories = [
        "Enero",
        "Febrero",
        "Marzo",
        "April",
        "Mayo",
        "Junio",
        "Julio",
        "Augosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ]
      this.rango = 11
      this.max = 12
      this.datas = [10, 41, 35, 51, 49, 62, 69, 91, 148]
      this.init()
    }

  }
  semi() {
    if (!this.flagSemi) {
      this.flagSemi = true
      this.flagMon = false
      this.flagAnnual = false
      this.categories = [
        "semestre 1 2021",
        "semestre 2 2021",
        "semestre 1 2022",
        "semestre 2 2022",
      ]
      this.rango = 3
      this.min = 0
      this.max = 4
      this.datas = [10, 41, 35, 51]
      this.items = [1, 2, 3, 4]
      this.init()
    }
  }
  annual() {

    if (!this.flagAnnual) {
      this.flagAnnual = true
      this.flagSemi = false
      this.flagMon = false
    }

  }

}
