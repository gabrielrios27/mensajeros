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
  editar: boolean = false
  centros: Array<Centro> = new Array
  constructor(private router: Router, public data: DataService, private admind: AdminService, private cdr: ChangeDetectorRef) { }
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
    this.admind.getCentros().subscribe({
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

  delete(center: Centro) {
    this.admind.deleteCenter(center.id).subscribe({
      next: data => {
        setTimeout(() => this.cdr.detectChanges());
        console.log(data)
      },
      error: err => {
        setTimeout(() => this.cdr.detectChanges());
        console.log(err)
      }
    })
  }


  close() {
    // if (this.data.center != null) {
    //   this.dataSource.push(this.data.center)
    // }

    this.data.flag = false
  }
}

