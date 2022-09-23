import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services';
import { LayoutsService } from '../../services';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.scss'],
})
export class UserNavbarComponent implements OnInit {
  flagLogOut: boolean = false;
  idToDelete: number = 0;
  //para sub-list
  flagReport: boolean = false;

  //Para modal de advertencia de cambio de pantalla------------------
  flagAddEdit: boolean = false;
  constructor(
    private _http: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private _layoutSvc: LayoutsService
  ) {}
  ngOnInit() {
    this.getVariableLocalStorage();
  }
  getVariableLocalStorage() {
    let flagAddEditStr = localStorage.getItem('flagAddEdit');
    if (flagAddEditStr) {
      this.flagAddEdit = JSON.parse(flagAddEditStr);
    }
  }

  toogleFlagReport() {
    this.flagReport = !this.flagReport;
  }

  logout() {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('axePage');
    localStorage.removeItem('userPage');
    localStorage.removeItem('centerPage');
    this._http.logout();
    window.location.reload()
    this.router.navigate(['auth/login'])
    setTimeout(() => this.cdr.detectChanges());
  }
  onClickLogout() {
    this.flagLogOut = true;
  }
  close() {
    this.flagLogOut = false;
  }
}
