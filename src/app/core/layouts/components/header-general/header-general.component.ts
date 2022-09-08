import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserData } from 'src/app/modules/user/models';
import { LayoutsService } from '../../services';

@Component({
  selector: 'app-header-general',
  templateUrl: './header-general.component.html',
  styleUrls: ['header-general.component.scss'],
})
export class HeaderGeneralComponent implements OnInit, OnDestroy {
  userData: UserData;
  // suscripciones
  onDestroy$: Subject<boolean> = new Subject();
  constructor(private layoutSvc: LayoutsService, private router: Router) {
    this.userData = {} as UserData;
  }
  ngOnInit() {
    this.getUserData();
  }
  getUserData() {
    this.layoutSvc
      .getUserData()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (data: UserData) => {
          this.userData = data;
          // this.user = this.userData.nombre;
        },
        error: (err) => {
          if (err.status === 401) {
            this.router.navigate(['/auth']);
          }
        },
      });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next(true);
  }
}
