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

  constructor(
    private _http: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private _layoutSvc: LayoutsService
  ) {}
  ngOnInit() {}

  logout() {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('axePage');
    localStorage.removeItem('userPage');
    localStorage.removeItem('centerPage');
    this._http.logout();
    setTimeout(() => this.cdr.detectChanges());
  }
  onClickLogout() {
    this.flagLogOut = true;
  }
  close() {
    this.flagLogOut = false;
  }
}
