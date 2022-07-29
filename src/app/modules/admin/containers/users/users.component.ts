import {  ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Routes, Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Users } from '../../models/users';
import { Centro } from '../../models/centro';
import { AdminService } from '../../services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['users.component.scss'],
})
export class UsersComponent implements OnInit {
  usuario: string =''
  user: Array<Users> = new Array
  centros: Array<Centro> = new Array
  usershow: Array<Users> = new Array
  flagEdited: boolean = false;
  flagNew: boolean = false;
  flagDelete: boolean = false;
  idToDelete: number = 0;
  newOrEditedUser: Users = {} as Users;

  constructor(private router: Router, private route: ActivatedRoute, public data: DataService, private admin: AdminService,private cdr: ChangeDetectorRef) { }


  ngOnInit() {

    this.getUsers()
    this.getCentros()
    this.getUserLocalStorage() 
  }

  busca(e: string) {

    if (e.toLocaleLowerCase() == '') {
      this.ngOnInit()
      this.getUsers()
    }
    else {
      this.user = this.user.filter(res => {
        return res.nombre.toLocaleLowerCase().match(this.usuario.toLocaleLowerCase())
      })
      console.log(this.usuario)
      console.log(this.user)
    }

  }

  create() {
    this.router.navigate(['admin/dashboard/usuarios/create-user']);
  }

  edit(user: Users) {
    this.router.navigate(['admin/dashboard/usuarios/create-user'])
    this.data.user = user
    this.data.editar = true
  }


  centroAsignado(user: Users): any {
    for (let c of this.centros) {
      if (user.nombre == c.usuario?.nombre) {
        return c.nombre
      }
    }

  }

  getCentros() {
    this.admin.getCentros().subscribe(data => {

      this.centros = data
      console.log(this.centros)
    })
  }

  getUsers() {
    this.admin.getUsers().subscribe({
      next:(res: Users[])=>{
        this.user = res.filter(resp=>{
          return resp.rolNombre?.match("ROLE_USER")
        })
        setTimeout(() => this.cdr.detectChanges())
        console.log(this.user)
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

  deleteUser() {
    this.flagDelete = false;
    this.admin.deleteUser(this.idToDelete).subscribe({
      next: (data:any)=>{
      setTimeout(() => this.cdr.detectChanges())
      console.log(data)
      this.getUsers()
    },
    error: (err)=>{
      console.log(err)
    }
    })
  }
  getUserLocalStorage() {
    let newOrEditeduser = localStorage.getItem('newOrEditedUser');
    if (newOrEditeduser) {
      setTimeout(() => {
        this.close();
      }, 3000);
    }

    let isNewUserStr = localStorage.getItem('isNewUser');
    let isNewUser;
    if (isNewUserStr) {
      
    }
    if (newOrEditeduser) {
      if (isNewUser) {
        this.flagNew = true;
        localStorage.removeItem('isNewUser');
      } else {
        this.flagEdited = true;
      }
      localStorage.removeItem('newOrEditedUser');
    }
  }
  

  close() {
    this.flagNew = false;
    this.flagEdited = false;
    this.flagDelete = false;
  }
}

