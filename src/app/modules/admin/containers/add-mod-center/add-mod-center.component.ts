import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Centro } from '../../models/centro';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-add-mod-center',
  templateUrl: './add-mod-center.component.html',
  styleUrls: ['./add-mod-center.component.scss'],
})
export class AddModCenterComponent implements OnInit {
  formUpEdit: FormGroup;
  nombre: any;
  Zona: any;
  centro: Centro = {} as Centro;
  idUser: number = 0;
  // para paginacion de axes
  itemsPerPage: number = 10;
  quantityOfPages: number = 1;
  centrosListComplete: Array<Centro> = new Array();
  constructor(
    private router: Router,
    public data: DataService,
    private fb: FormBuilder,
    private admin: AdminService,
    private cdr: ChangeDetectorRef
  ) {
    this.formUpEdit = fb.group({
      nombre: ['', Validators.required],
      zona: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.validarEdit();
    this.getCenters(); //para paginación
  }

  confirm(center: Centro) {
    this.addCenter(this.formUpEdit.value);
  }
  getCenters() {
    //para paginación
    this.admin.getCentros().subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        this.centrosListComplete = data;
      },
      error: (err) => {
        setTimeout(() => this.cdr.detectChanges());
        console.log(err);
      },
    });
  }
  setPageLocalStorage() {
    //para paginación
    this.quantityOfPages = Math.ceil(
      (this.centrosListComplete.length + 1) / this.itemsPerPage
    );
    localStorage.setItem('centerPage', JSON.stringify(this.quantityOfPages));
  }
  addCenter(center: Centro) {
    console.log(center)
    this.setPageLocalStorage(); //para paginación
    this.admin.addCenter(center).subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        console.log(data);
        this.data.flag = false;
        this.data.editar = false;
        this.data.nombreCentro = this.formUpEdit.value.nombre;
        this.setCentroLocStg(this.formUpEdit.value.nombre, true);
        this.formUpEdit.reset();
        this.router.navigate(['admin/dashboard/centros']);
      },
      error: (err) => {
        setTimeout(() => this.cdr.detectChanges());
        console.log(err);
      },
    });
  }

  buscaUser(id: any) {
    this.admin.getCenter(id).subscribe({
      next: (data) => {
        console.log(data);
        this.centro = data;
      },
      error: (err) => {
        console.log(err);
      },
    });

    if (this.centro.usuario?.id) {
      this.idUser = this.centro.id;
    }
  }
  validarEdit() {
    if (this.data.editar) {
      this.nombre = this.data.center?.nombre;
      this.Zona = this.data.center?.zona;
    } else {
      this.nombre = '';
    }
  }
  editar(centro: Centro) {
    console.log(this.data.center?.id);
    if (this.idUser) {
      centro.usuario = this.centro.usuario;
    } else {
      centro.usuario = {
        id: '',
        nombre: '',
        contrasena: '',
        email: '',
        rolNombre: ''
      };
    }

    this.buscaUser(this.data.center?.id);
    this.editCenter(centro, this.data.center?.id);
  }

  editCenter(center: Centro, id: any) {
    console.log(center);
    this.admin.editCenter(center, id).subscribe({
      next: (data) => {
        setTimeout(() => this.cdr.detectChanges());
        console.log(data);
        this.data.flag = false;
        this.data.editar = false;
        this.data.center = data;
        this.data.nombreCentro = '';
        this.setCentroLocStg(this.formUpEdit.value.nombre, false);
        this.formUpEdit.reset();
        this.router.navigate(['admin/dashboard/centros']);
      },
      error: (err) => {
        setTimeout(() => this.cdr.detectChanges());
        console.log(err);
      },
    });
  }

  setCentroLocStg(data: string, isNewCentro: boolean) {
    localStorage.setItem('newOrEditedCenter', data);
    localStorage.setItem('isNewCenter', JSON.stringify(isNewCentro));
  }
}
