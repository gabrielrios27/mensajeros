import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Centro } from '../../models/centro';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-centers',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './centers.component.html',
  styleUrls: ['centers.component.scss'],
})
export class CentersComponent implements OnInit {
  Centro: any
  centro: any
  editar: boolean = false
  centros: Array<Centro> = new Array
  flagEdited: boolean = false;
  flagNew: boolean = false;
  flagDelete: boolean = false;
  idToDelete: number = 0;
  newOrEditedCenter: Centro = {} as Centro;


  constructor(private router: Router, public data: DataService, private admin: AdminService, private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    this.getCenters()
  }

  busca(e: string) {

    if (e.toLocaleLowerCase() == '') {
      this.ngOnInit()
    }
    else {
      this.centros = this.centros.filter(res => {
        return res.nombre.toLowerCase().match(this.Centro.toLowerCase())
      })
      console.log(this.centros)
    }

  }

  create() {
    this.router.navigate(['admin/dashboard/centros/add-mod-center']);
  }

  edit(center: Centro) {
    this.editar = true
    this.router.navigate(['admin/dashboard/centros/add-mod-center'])
    this.data.center = center
    this.data.editar = true
  }

  getCenters() {
    this.admin.getCentros().subscribe({
      next: data => {
        setTimeout(() => this.cdr.detectChanges());
        this.centros = data
        console.log(data)
      },
      error: (err) => {
        setTimeout(() => this.cdr.detectChanges());
        console.log(err)
      }
    })
  }
  getCenter() {
    this.admin.getUsers().subscribe({
      next:(res: any)=>{
        this.centro = res
        setTimeout(() => this.cdr.detectChanges())
        console.log(this.centro )
      },
      error: (err) =>{
        console.log(err)
      }
    })
  }

  
  onClickDelete(id: number) {
    this.flagDelete = true;
    this.idToDelete = id;
  }

  delete() {
    this.admin.deleteCenter(this.idToDelete).subscribe({
      next: (data:any)=>{
      setTimeout(() => this.cdr.detectChanges())
      console.log(data)
      this.getCenter()
      this.close()
    },
    error: (err)=>{
      console.log(err)
    }
    })
  }

  elim(c: Centro){
    this.idToDelete = c.id
    this.flagDelete = true
  }

  getUserLocalStorage() {
    let newOrEditedCenter = localStorage.getItem('newOrEditedCenter');
    if (newOrEditedCenter) {
      this.newOrEditedCenter = JSON.parse(newOrEditedCenter);
      setTimeout(() => {
        this.close();
      }, 3000);
    }

    let isNewCenterStr = localStorage.getItem('isNewCenter');
    let isNewCenter;
    if (isNewCenterStr) {
      isNewCenter = JSON.parse(isNewCenterStr);
    }
    if (newOrEditedCenter) {
      if (isNewCenter) {
        this.flagNew = true;
        localStorage.removeItem('isNewCenter');
      } else {
        this.flagEdited = true;
      }
      localStorage.removeItem('newOrEditedCenter');
    }
  }
  

  close() {
    this.flagNew = false;
    this.flagEdited = false;
    this.flagDelete = false;
  }

}

