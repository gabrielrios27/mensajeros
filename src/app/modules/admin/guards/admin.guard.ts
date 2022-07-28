import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../auth/services';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private _authSvc: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> {
    return this._authSvc.getRole().pipe(
      map((data: any) => {
        if (data.authority === 'ROLE_ADMIN') {
          return true;
        } else {
          this.router.navigate(['/auth']);
          return false;
        }
      })
    );
  }
}
