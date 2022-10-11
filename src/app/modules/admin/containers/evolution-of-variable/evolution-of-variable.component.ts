import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { AdminService } from '../../services';
import { variable } from '../../models/admin.model';

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
import { evolutionVariable } from '../../models/evolutionVariable';
import { element } from 'protractor';


@Component({
  selector: 'app-evolution-of-variable',
  templateUrl: './evolution-of-variable.component.html',
  styleUrls: ['./evolution-of-variable.component.scss']
})
export class EvolutionOfVariableComponent implements OnInit {

  idCenter: any
  idVariable: any
  onDestroy$: Subject<boolean> = new Subject();
  variable: Array<evolutionVariable> = []

  date = new Date()

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
  data: Array<any> = [null, null, null, null, null, null, null, null, null, null, null, null]
  max = 12
  min = 0
  rango = 11
  flagMon = true
  flagSemi = false
  flagAnnual = false
  items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  offsetY = 0
  name: any

  constructor(private routeActive: ActivatedRoute,
    private _adminSvc: AdminService,
    private _cdr: ChangeDetectorRef,
    private router: Router) {
    this.init()
  }

  ngOnInit(): void {
    this.getIdFromRute()
    this.getVariable()
    this.getDataMon()
  }

  // modificaciones de grafico
  private init(): void {
    this.title = {
      text: ""
    };

    this.series = [
      {
        name: this.name,
        data: this.data
      }
    ],
      this.grid = {
        borderColor: "black"
      },

      this.chart = {
        type: 'line',
        width: 850,
        toolbar: {
          show: false
        }

      },
      this.xaxis = {
        type: 'category',
        categories: this.categories,
        axisBorder: {
          show: false,
          color: '#1967D2',
          offsetY: 3,
        },
        axisTicks: {
          show: true,
          borderType: 'solid',
          color: 'black',
          height: 6,
        },
        labels: {
          offsetX: this.offsetY,
        },
        crosshairs: {
          show: false,
        }
      },
      this.markers = {
        size: 4,
        shape: "square",
        radius: 1,
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
          formatter: function (value) {
            return ("Mas de " + value);
          }
        }
      }
  }

  getIdFromRute() {
    this.routeActive.paramMap.subscribe((params: ParamMap) => {
      this.name = params.get('name');
      this.idCenter = params.get('idCenter');
      this.idVariable = params.get('idVariable');
    });
  }

  getVariable() {
    this._adminSvc
      .getEvolutionOfVariable(this.idCenter, this.idVariable)
      .subscribe({
        next: (data: evolutionVariable[]) => {
          this.variable = data;
          console.log(data)
          this.getDataMon()
          setTimeout(() => this._cdr.detectChanges());
        },
        error: (err) => {
          if (err.status === 401) {
            this.router.navigate(['/auth']);
          }
        },
        complete: () => {
        },
      });
  }

  //carga los datos mensualmente 
  getDataMon(): any {
    let mont
    let since
    let until
    this.variable.map((v) => {
      since = new Date(v.periodo_desde)
      until = new Date(v.periodo_hasta)
      if (this.date.getFullYear() == until.getFullYear() && this.date.getFullYear() == since.getFullYear()) {
        mont = (until.getMonth() - since.getMonth()) + 1
        let monts = since.getMonth()
        while (monts < until.getMonth()) {
          this.data[monts - 1] += v.numerico
          monts += 1
        }
      }
      if (this.date.getFullYear() <= until.getFullYear() && this.date.getFullYear() > since.getFullYear()) {
        mont = (until.getMonth())
        let monts = 0
        while (monts < mont) {
          this.data[monts] += v.numerico
          monts += 1
        }
      }
      if (this.date.getFullYear() < until.getFullYear() && this.date.getFullYear() == since.getFullYear()) {
        mont = (since.getMonth())
        let monts = 12 - mont
        for (let i = 0; i < monts; i++) {
          this.data[mont] += v.numerico
          mont += 1
        }
      }
    })
    this.init()
    return this.data
  }

  // carga datos de semetres anterior al año corriente
  lastYear(element: evolutionVariable) {
    let since = new Date(element.periodo_desde)
    let until = new Date(element.periodo_hasta)
    if (since.getMonth() <= 6 || until.getMonth() <= 6) {
      this.data[0] += element.numerico
    }
    if (since.getMonth() > 6 || until.getMonth() > 6) {
      this.data[1] += element.numerico
    }
  }

  //carga datos de semetres al año corriente
  currentYear(element: evolutionVariable) {
    let since = new Date(element.periodo_desde)
    let until = new Date(element.periodo_hasta)
    if (since.getMonth() <= 6 || until.getMonth() <= 6) {
      this.data[2] += element.numerico
    }
    if (since.getMonth() > 6 || until.getMonth() > 6) {
      this.data[3] += element.numerico
    }
  }

  //carga los datos de semestre dependiendo del intervalo anual
  intervalAnnual(element: evolutionVariable) {
    let since = new Date(element.periodo_desde)
    let until = new Date(element.periodo_hasta)
    if (since.getFullYear() < this.date.getFullYear() - 1 && until.getFullYear() == this.date.getFullYear() - 1) {
      if (until.getMonth() <= 6) {
        this.data[0] += element.numerico
        this.data[1] += element.numerico
      }
      if (until.getMonth() > 6) {
        this.data[1] += element.numerico
      }
    }
    if (since.getFullYear() < this.date.getFullYear() - 1 && until.getFullYear() == this.date.getFullYear()) {
      if (until.getMonth() <= 6) {
        this.data[0] += element.numerico
        this.data[1] += element.numerico
        this.data[2] += element.numerico
      }
      if (until.getMonth() > 6) {
        this.data[0] += element.numerico
        this.data[1] += element.numerico
        this.data[2] += element.numerico
        this.data[3] += element.numerico
      }
    }

    if (since.getFullYear() == this.date.getFullYear() - 1 && until.getFullYear() == this.date.getFullYear()) {
      if (since.getMonth() <= 6) {
        this.data[0] += element.numerico
        this.data[1] += element.numerico
      }
      if (since.getMonth() > 6) {
        this.data[1] += element.numerico
      }
      if (until.getMonth() <= 6) {
        this.data[2] += element.numerico
      }
      if (until.getMonth() > 6) {
        this.data[2] += element.numerico
        this.data[3] += element.numerico
      }
    }
    if (since.getFullYear() == this.date.getFullYear() && until.getFullYear() > this.date.getFullYear()) {
      if (since.getMonth() <= 6) {
        this.data[2] += element.numerico
        this.data[3] += element.numerico
      }
      if (since.getMonth() > 6) {
        this.data[3] += element.numerico
      }
    }
  }

  // carga los datos de forma semestral
  getDataSemi(): any {
    let since
    let until
    this.variable.map((element) => {
      since = new Date(element.periodo_desde)
      until = new Date(element.periodo_hasta)
      if (since.getFullYear() == this.date.getFullYear() - 1 && until.getFullYear() == this.date.getFullYear() - 1) {
        this.lastYear(element)
      }
      if (since.getFullYear() == this.date.getFullYear() && until.getFullYear() == this.date.getFullYear()) {
        this.currentYear(element)
      }
      this.intervalAnnual(element)
    })
    this.init()
    return this.data
  }

  // carga los datos de forma anual
  getDataAnnual(): any {
    this.data = [null, null, null, null]
    let since
    let until
    this.variable.map((element) => {
      since = new Date(element.periodo_desde)
      until = new Date(element.periodo_hasta)
      if (since.getFullYear() < this.date.getFullYear() - 3 && until.getFullYear() == this.date.getFullYear() - 3) {
        this.data[0] += element.numerico
      }
      if (since.getFullYear() < this.date.getFullYear() - 3 && until.getFullYear() <= this.date.getFullYear() - 2) {
        this.data[0] += element.numerico
        this.data[1] += element.numerico
      }
      if (since.getFullYear() < this.date.getFullYear() - 3 && until.getFullYear() <= this.date.getFullYear() - 1) {
        this.data[0] += element.numerico
        this.data[1] += element.numerico
        this.data[2] += element.numerico
      }
      if (since.getFullYear() < this.date.getFullYear() - 3 && until.getFullYear() <= this.date.getFullYear()) {
        this.data[0] += element.numerico
        this.data[1] += element.numerico
        this.data[2] += element.numerico
        this.data[3] += element.numerico
      }
      if (since.getFullYear() == this.date.getFullYear() - 3 && until.getFullYear() == this.date.getFullYear()) {
        this.data[0] += element.numerico
        this.data[1] += element.numerico
        this.data[2] += element.numerico
        this.data[3] += element.numerico
      }
      if (since.getFullYear() == this.date.getFullYear() - 2 && until.getFullYear() == this.date.getFullYear()) {
        this.data[1] += element.numerico
        this.data[2] += element.numerico
        this.data[3] += element.numerico
      }
      if (since.getFullYear() == this.date.getFullYear() - 1 && until.getFullYear() == this.date.getFullYear()) {
        this.data[2] += element.numerico
        this.data[3] += element.numerico
      }

      if (since.getFullYear() == this.date.getFullYear() && until.getFullYear() == this.date.getFullYear()) {
        this.data[3] += element.numerico
      }
      if (since.getFullYear() == this.date.getFullYear() && until.getFullYear() > this.date.getFullYear()) {
        this.data[3] += element.numerico
      }

    })
    this.init()
    return this.data
  }


  monthly() {
    if (!this.flagMon) {
      this.data = [null, null, null, null, null, null, null, null, null, null, null, null]
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
      this.items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      this.offsetY = 0
      this.data = this.getDataMon()
      this.init()
    }

  }
  semi() {
    if (!this.flagSemi) {
      this.data = [null, null, null, null]
      this.flagSemi = true
      this.flagMon = false
      this.flagAnnual = false
      this.categories = [
        "semestre 1 " + (this.date.getFullYear() - 1),
        "semestre 2 " + (this.date.getFullYear() - 1),
        "semestre 1 " + this.date.getFullYear(),
        "semestre 2 " + this.date.getFullYear(),
      ]
      this.data = this.getDataSemi()
      this.items = [1, 2, 3, 4]
      this.offsetY = 2
      this.init()
    }
  }
  annual() {
    if (!this.flagAnnual) {
      this.data = [null, null, null, null]
      this.flagAnnual = true
      this.flagSemi = false
      this.flagMon = false
      this.categories = [
        "Año " + (this.date.getFullYear() - 3),
        "Año " + (this.date.getFullYear() - 2),
        "Año " + (this.date.getFullYear() - 1),
        "Año " + (this.date.getFullYear()),
      ]
      this.data = this.getDataAnnual()
      this.items = [1, 2, 3, 4]
      this.offsetY = 2
      this.init()
    }

  }

}
