import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


const Listvariables : any = [
  {
      "id": 20,
      "nombre": "cant. talleres",
      "descripcion": "desc",
      "tipo": "Textual",
      "genero": "false",
      "escala_valor": "true",
      "valor_inicial": "0",
      "valor_final": "5",
      "etiqueta_inicial": "aa",
      "etiqueta_final": "zz",
      "eje": {
          "id": 5,
          "nombre": "Acompañamiento Educativo"
      }
  },
  {
      "id": 32,
      "nombre": "Cantidad de participantes en taller1",
      "descripcion": "desc.222",
      "tipo": "Textual",
      "genero": "false",
      "escala_valor": "false",
      "valor_inicial": "null",
      "valor_final": "null",
      "etiqueta_inicial": "null",
      "etiqueta_final": "null",
      "eje": {
          "id": 5,
          "nombre": "Acompañamiento Educativo"
      }
  },
  {
      "id": 34,
      "nombre": "Cantidad de Voluntarios",
      "descripcion": "desc",
      "tipo": "Numérico",
      "genero": "true",
      "escala_valor": "false",
      "valor_inicial": null,
      "valor_final": null,
      "etiqueta_inicial": null,
      "etiqueta_final": null,
      "eje": {
          "id": 4,
          "nombre": "Seguridad Nutricional"
      }
  },
  {
      "id": 35,
      "nombre": "Observaciones",
      "descripcion": "desc",
      "tipo": "Textual",
      "genero": "false",
      "escala_valor": "false",
      "valor_inicial": null,
      "valor_final": null,
      "etiqueta_inicial": null,
      "etiqueta_final": null,
      "eje": {
          "id": 4,
          "nombre": "Seguridad Nutricional"
      }
  }
]
const listResponse :any = [
  {
      "idVariable": 20,
      "textual": "vczvc",
      "numerico": null,
      "femenino": null,
      "masculino": null,
      "noBinario": null,
      "escala": 4,
      "observaciones": null
  },
  {
      "idVariable": 32,
      "textual": "vcb xcvbccx",
      "numerico": null,
      "femenino": null,
      "masculino": null,
      "noBinario": null,
      "escala": null,
      "observaciones": null
  },
  {
      "idVariable": 34,
      "textual": null,
      "numerico": null,
      "femenino": 25,
      "masculino": 5,
      "noBinario": 5,
      "escala": null,
      "observaciones": null
  },
  {
      "idVariable": 35,
      "textual": "ghdgh",
      "numerico": null,
      "femenino": null,
      "masculino": null,
      "noBinario": null,
      "escala": null,
      "observaciones": null
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
  
  centerSelects = ["Hogar Geraige"]
  axes:any = []
  since = '01/07/2022'
  until = '31/12/2022'
  receptionDate = '03/01/2023'
  observ = ''
  variables: Array<any> = Listvariables
  response: Array<any> = listResponse
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
    console.log("axe",this.axes)
  }
  variablesShow(axe: any){
    console.log(this.variables.filter(res=> {return axe.id == res.eje.id}))
    return  this.variables.filter(res=> {return axe.id == res.eje.id})
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
