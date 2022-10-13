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
  //Para modal de advertencia de cambio de pantalla------------------
  flagAddEdit: boolean = false;
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
    this.getVariableLocalStorage();
    if (this.flagAddEdit === true) {
      return true;
    }
    let subject = new Subject<boolean>();
    component.openDialog();
    subject = component.subject;
    return subject.asObservable();
  }
  getVariableLocalStorage() {
    let flagAddEditStr = localStorage.getItem('flagAddEdit');
    if (flagAddEditStr) {
      this.flagAddEdit = JSON.parse(flagAddEditStr);
    }
  }
}
