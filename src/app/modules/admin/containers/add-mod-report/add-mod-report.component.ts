import { Component, OnInit} from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-add-mod-report',
  templateUrl: './add-mod-report.component.html',
  styleUrls: ['./add-mod-report.component.scss']
})
export class AddModReportComponent implements OnInit {

  nombre: any
  variables: any;
  eje: any
  ejes: Array<any> = ["hola", "pepe", "jose"]
  arrayc: Array<number> = [1]
// para modal de advertencia
  flagAddEdit: boolean = false;
  showDialog = false;
  subject = new Subject<boolean>();
//
  formAdd: FormGroup;


  constructor(private fb: FormBuilder,) {
    this.formAdd = fb.group({
      nombre: ['', Validators.required],
      centros: ['', Validators.required],
      desde: ['', Validators.required],
      hasta: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.setFlagAddEdit(false);
  }

  createEje() {
    this.arrayc.push(1)
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
// Para modal de advertencia de cambio de pantalla
  setFlagAddEdit(value: boolean) {
    this.flagAddEdit = value;
    localStorage.setItem('flagAddEdit', JSON.stringify(this.flagAddEdit));
  }
  onSelection($event: any) {
    console.log($event);
    this.showDialog = false;
    if ($event === 'ok') {
      this.subject.next(true);
      this.setFlagAddEdit(false);
    } else {
      this.subject.next(false);
    }
  }
  openDialog() {
    console.log('opn dialog');
    this.showDialog = true;
  }
//
}
