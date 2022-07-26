import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Users } from '../../models/users';
import { Centro } from '../../models/centro';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-am-user',
  templateUrl: './am-user.component.html',
  styleUrls: ['./am-user.component.scss']
})
export class AmUserComponent implements OnInit {
  
  formUpEdit: FormGroup;
  nombre: any = this.data.user?.nombre
  email: any = this.data.user?.email
  contrasena: any = this.data.user?.contrasena
  centroAsignado: any

  centros: Array<Centro> = new Array<Centro>()

  constructor(private router: Router, private data:DataService, private fb:FormBuilder, private admin: AdminService,private cdr: ChangeDetectorRef) {
    this.formUpEdit = fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.compose([Validators.required,Validators.email])],
      contrasena: ['', Validators.compose([Validators.required,Validators.minLength(8)])]
    })
  }

  
  ngOnInit(): void {
    this.getCentros()
  }

  confirm(user:Users){
    user.rolNombre = "ROLE_USER"
    this.edit(user,this.data.user?.id)
    this.data.nombreUsuario = this.formUpEdit.value.nombre
    this.data.flag = true
    this.data.editar = true
    this.formUpEdit.reset()
  }

  edit(user: Users,id: any){
    this.admin.editUser(user,id).subscribe({
      next: data=>{
        setTimeout(() => this.cdr.detectChanges())
        console.log(data)
        this.router.navigate(['admin/dashboard/usuarios']);
      },
      error: (err)=>{
        console.log(err)
      }
    })
    
  }

  getCentros(){
    this.admin.getCentros().subscribe( data=>{
        this.centros = data
        console.log(this.centros)
    })
  }

}
