import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  usuario: string = '';
  user: Array<Users> = new Array();
  centros: Array<Centro> = new Array();
  usershow: Array<Users> = new Array();
  centroAsig: Array<string> = []
  flagEdited: boolean = false;
  flagNew: boolean = false;
  flagDelete: boolean = false;
  idToDelete: number = 0;
  newOrEditedUser: Users = {} as Users;

  // pagination
  userListComplete: Array<Users> = new Array();
  listLenght: number = 0;
  itemsPerPage: number = 10;
  quantityOfPages: number = 1;
  currentPage: number = 1;
  listCurrentPage: Array<Users> = new Array();
  initialItem: number = 1;
  finalItem: number = 10;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public data: DataService,
    private admin: AdminService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getUsers();
    this.getCentros();
    this.getUserLocalStorage();
  }

  busca(e: string) {
    if (e.toLocaleLowerCase() == '') {
      this.ngOnInit();
      this.getUsers();
    } else {
      this.user = this.user.filter((res) => {
        return res.nombre
          .toLocaleLowerCase()
          .match(this.usuario.toLocaleLowerCase());
      });
      console.log(this.usuario);
      console.log(this.user);
    }
  }

  create() {
    this.router.navigate(['admin/dashboard/usuarios/create-user']);
  }

  edit(user: Users) {
    this.router.navigate(['admin/dashboard/usuarios/create-user']);
    this.data.user = user;
    this.data.editar = true;
  }

  centroAsignado(user: Users): any {
    let i = 0
    this.centroAsig = []
    for (let c of this.centros) {
      if (user.nombre == c.usuario?.nombre) {
        this.centroAsig[i] = c.nombre;
        i+=1
      }
    }
    return this.centroAsig
  }

  tipoRol(rol: any): any{
    if(rol){
      if(rol === "ROLE_USER"){
        return 'Director de Centro'
      }
      else {
        return 'Director de ONG(Admin)'
      }
    }
  }

  getCentros() {
    this.admin.getCentros().subscribe((data) => {
      this.centros = data;
      console.log(this.centros);
    });
  }

  getUsers() {
    this.currentPage = this.getPageLocalStorage();
    this.admin.getUsers().subscribe({
      next: (res: Users[]) => {
        this.userListComplete = res
        console.log('userlistcomplete', this.userListComplete);

        this.pageToShow(this.currentPage, this.userListComplete); //para paginación
        setTimeout(() => this.cdr.detectChanges());
        console.log(this.user);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  //para paginación----
  pageToShow(page: number, list: Users[]) {
    this.setPageLocalStorage(page);
    this.listLenght = list.length;
    this.quantityOfPages = Math.ceil(this.listLenght / this.itemsPerPage);
    this.listCurrentPage = [];
    if (page <= 1) {
      this.listCurrentPage = list.slice(0, 10);
      this.user = this.listCurrentPage;
      this.initialItem = 1;
      if (this.listLenght < this.itemsPerPage) {
        this.finalItem = this.listLenght;
      } else {
        this.finalItem = 10;
      }
    } else if (page > 1 && page < this.quantityOfPages) {
      this.listCurrentPage = list.slice(
        page * this.itemsPerPage - this.itemsPerPage,
        page * this.itemsPerPage
      );
      this.user = this.listCurrentPage;
      this.initialItem = page * this.itemsPerPage - this.itemsPerPage + 1;
      this.finalItem =
        page * this.itemsPerPage -
        this.itemsPerPage +
        this.listCurrentPage.length;
    } else if (page >= this.quantityOfPages) {
      this.listCurrentPage = list.slice(
        this.quantityOfPages * this.itemsPerPage - this.itemsPerPage
      );
      this.user = this.listCurrentPage;
      this.initialItem =
        this.quantityOfPages * this.itemsPerPage - this.itemsPerPage + 1;
      this.finalItem =
        this.quantityOfPages * this.itemsPerPage -
        this.itemsPerPage +
        this.listCurrentPage.length;
    }
  }
  onClickBefore() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageToShow(this.currentPage, this.userListComplete);
    } else {
      this.currentPage = 1;
      this.pageToShow(this.currentPage, this.userListComplete);
    }
  }
  onClickAfter() {
    if (this.currentPage < this.quantityOfPages) {
      this.currentPage++;
      this.pageToShow(this.currentPage, this.userListComplete);
    } else {
      this.currentPage = this.quantityOfPages;
      this.pageToShow(this.currentPage, this.userListComplete);
    }
  }
  setPageLocalStorage(page: number) {
    localStorage.setItem('userPage', JSON.stringify(page));
  }
  getPageLocalStorage(): number {
    let pageLocalStorage: number = 1;
    let pageLocalStorageJSON = localStorage.getItem('userPage');
    if (pageLocalStorageJSON) {
      pageLocalStorage = JSON.parse(pageLocalStorageJSON);
    }
    return pageLocalStorage;
  }
  //--------------------------------------------
  onClickDelete(id: number) {
    this.flagDelete = true;
    this.idToDelete = id;
  }

  deleteUser() {
    this.flagDelete = false;
    this.admin.deleteUser(this.idToDelete).subscribe({
      next: (data: any) => {
        setTimeout(() => this.cdr.detectChanges());
        console.log(data);
        this.getUsers();
      },
      error: (err) => {
        console.log(err);
      },
    });
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
      isNewUser = JSON.parse(isNewUserStr);
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
