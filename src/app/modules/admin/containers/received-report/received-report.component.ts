import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


const Listvariables : any =[
  {
      id: 5,
      nombre: "Cantidad de Voluntarios",
      descripcion: "descripción",
      tipo: "Numérico",
      genero: "false",
      escala_valor: "false",
      valor_inicial: "null",
      valor_final: "null",
      etiqueta_inicial: "null",
      etiqueta_final: "null",
      eje: {
          id: 3,
          nombre: "Acompañamiento en Salud"
      }
  },
  {
      id: 21,
      nombre: "Nivel de mejoría",
      descripcion: "desc",
      tipo: "Textual",
      genero: "false",
      escala_valor: "true",
      valor_inicial: "0",
      valor_final: "6",
      etiqueta_inicial: "Malo",
      etiqueta_final: "Muy Bueno",
      eje: {
          id: 3,
          nombre: "Acompañamiento en Salud"
      }
  }
]
@Component({
  selector: 'app-received-report',
  templateUrl: './received-report.component.html',
  styleUrls: ['./received-report.component.scss']
})
export class ReceivedReportComponent implements OnInit {

  alphabet: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  biAlphabet: string[] = [];
  
  centerSelects = ["la balsa", "Hogar Geraige"]
  axes:any = []
  since = '01/07/2022'
  until = '31/12/2022'
  receptionDate = '03/01/2023'
  observ = ''
  variables: Array<any> = Listvariables
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.createBiAlphabet();
    this.pushAxe()
  }

  storageChange() {
    this.router.navigate(['admin/dashboard/reportes/centro-de-reportes'])
  }

  backToReports() {
    this.router.navigate(['admin/dashboard/reportes/centro-de-reportes'])
  }

  pushAxe(){
    for (let vari of this.variables) {
      if(this.axes.length === 0){
        this.axes.push(vari.eje);
      }
      else if(!this.axes.find(vari.eje.id)){
        this.axes.push(vari.eje);
      }
    }
    console.log(this.axes)
  }
  variablesShow(axe: any){
    return this.variables.filter(res=> {return axe.id == res.eje.id})
  }

  createBiAlphabet() {
    let i;
    this.biAlphabet = [];
    for (i = 0; i < 26; i++) {
      this.biAlphabet.push(this.alphabet[i]);
    }
    i++;
    for (let character1 of this.alphabet) {
      for (let character2 of this.alphabet) {
        if (i < 677) {
          this.biAlphabet.push(character1 + character2);
          i++;
        }
      }
    }
  }
}
