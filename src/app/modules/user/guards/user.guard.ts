import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of, map } from 'rxjs';
import { AuthService } from '../../auth/services';

@Injectable()
export class UserGuard implements CanActivate {
    constructor(private _authSvc: AuthService, private router: Router) { }
    canActivate(): Observable<boolean> {
        let isUserLocalStorage;
        let isUserLocalStorageJSON = localStorage.getItem('isUser');
        if (isUserLocalStorageJSON) {
            isUserLocalStorage = JSON.parse(isUserLocalStorageJSON);
            if (isUserLocalStorage) {
                return of(true);
            }
        }
        let isUser = this._authSvc.getRole().pipe(
            map((data: any) => {
                if (data.authority === 'ROLE_USER') {
                    localStorage.setItem('isUser', JSON.stringify(true));
                    return true;
                } else {
                    localStorage.removeItem('isUser');
                    this.router.navigate(['/auth']);
                    return false;
                }
            })
        );
        return isUser;
    }
}
