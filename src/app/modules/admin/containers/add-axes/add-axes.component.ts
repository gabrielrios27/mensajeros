import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { axes } from '../../models';
import { AdminService } from '../../services';

const ELEMENT_DATA: axes[] = [
  {
    id: 123,
    nombre: 'Educacion',
  },
  {
    id: 34,
    nombre: 'Salud',
  },
  {
    id: 454,
    nombre: 'Eje 3',
  },
];
@Component({
  selector: 'app-add-axes',
  templateUrl: './add-axes.component.html',
  styleUrls: ['./add-axes.component.scss'],
})
export class AddAxesComponent implements OnInit {
  newAxe: FormGroup = this.fb.group({
    axe: [, [Validators.required]],
    centers: [],
  });

  centerList: string[] = [
    'Hogar Colibríes',
    'San Jose',
    'Club de Día',
    'Centro la Balsa',
    'Centro la Balsa',
    'Centro la Balsa',
  ];
  invalidForm: boolean = false;
  idAxe: number;
  // suscripciones
  onDestroy$: Subject<boolean> = new Subject();
  axeById: axes;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private _adminSvc: AdminService
  ) {
    this.idAxe = 0;
    this.axeById = {} as axes;
  }

  ngOnInit(): void {
    this.idAxe = this.getIdFromRute();
    console.log('id ruta:' + this.idAxe);
    this.completeInputWithAxe(this.idAxe);
  }
  onConfirm() {
    if (this.newAxe.invalid) {
      this.invalidForm = true;
      return;
    } else {
      this.invalidForm = true;
      console.log(this.newAxe);
      this.setAxeLocStg(true);
      this.router.navigate(['admin/dashboard/ejes']);
    }
  }
  onChangeInput(e: string) {
    if (e.length !== 0) {
      this.invalidForm = false;
    }
  }
  setAxeLocStg(data: boolean) {
    localStorage.setItem('isNewAxe', JSON.stringify(data));
  }
  getIdFromRute(): number {
    let idToShow;
    this.rutaActiva.paramMap
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((params: ParamMap) => {
        idToShow = params.get('id');
      });
    return Number(idToShow);
  }
  getAxeById(id: number) {
    this._adminSvc.getAxeWithId(id).subscribe({
      next: (data: axes) => {
        this.axeById = data;
        console.log('el axeById es:' + this.axeById);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('Request trending complete');
      },
    });
  }
  completeInputWithAxe(id: number) {
    if (this.idAxe !== 0) {
      this.getAxeById(id);
    }
  }
}
