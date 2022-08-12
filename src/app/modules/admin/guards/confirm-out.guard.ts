import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AddReportComponent, AddVariablesComponent } from '../containers';

@Injectable({
  providedIn: 'root',
})
export class ConfirmOutGuard implements CanDeactivate<AddVariablesComponent> {
  canDeactivate(
    component: AddVariablesComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('deactivate');
    let subject = new Subject<boolean>();
    component.openDialog();
    subject = component.subject;
    return subject.asObservable();
  }
}
