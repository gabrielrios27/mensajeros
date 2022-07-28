import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AuthService } from '../../auth/services';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private _authSvc: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> {
    let isAdminLocalStorage;
    let isAdminLocalStorageJSON = localStorage.getItem('isAdmin');
    if (isAdminLocalStorageJSON) {
      isAdminLocalStorage = JSON.parse(isAdminLocalStorageJSON);
      if (isAdminLocalStorage) {
        console.log('guard con loc stg');

        return of(true);
      }
    }
    let isAdmin = this._authSvc.getRole().pipe(
      map((data: any) => {
        if (data.authority === 'ROLE_ADMIN') {
          localStorage.setItem('isAdmin', JSON.stringify(true));
          return true;
        } else {
          localStorage.removeItem('isAdmin');
          this.router.navigate(['/auth']);
          return false;
        }
      })
    );
    return isAdmin;
  }
}
