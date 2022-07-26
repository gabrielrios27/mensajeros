import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../auth/services';
import { role } from '../models';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private _authSvc: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> {
    let role: role;
    let isAdmin: boolean;
    let getRol = this._authSvc.getRole().subscribe({
      next: (data: role) => {
        role = data;
        if (role.authority === 'ROLE_ADMIN') {
          isAdmin = true;
        } else {
          isAdmin = false;
        }
      },
      error: (err) => {
        console.log(err);
        if (err.status === 401) {
          this.router.navigate(['/auth']);
        }
      },
      complete: () => {
        console.log('Request complete');
        console.log('response rol: ', getRol);
      },
    });

    return of(true);
  }
}
