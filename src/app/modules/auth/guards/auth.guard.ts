import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private loginService: AuthService) {}
  canActivate(): Observable<boolean> {
    return this.loginService.isLogged.pipe(
      take(1),
      map((islogged: boolean) => !islogged)
    );
  }
}
