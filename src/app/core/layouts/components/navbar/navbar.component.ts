import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { AuthService } from '../../../../modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { LayoutsService } from '../../services';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './navbar.component.html',
  styleUrls: ['navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
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
    setTimeout(() => this.cdr.detectChanges());
  }
  onClickLogout() {
    this.flagLogOut = true;
  }
  close() {
    this.flagLogOut = false;
  }
}
