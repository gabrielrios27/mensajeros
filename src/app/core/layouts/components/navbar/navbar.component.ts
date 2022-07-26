import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../../modules/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './navbar.component.html',
  styleUrls: ['navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private _http: AuthService, private cdr : ChangeDetectorRef,private router: Router) {}
  ngOnInit() {}

  logout(){
    this._http.logout()
    setTimeout(() => this.cdr.detectChanges())
  }
}
