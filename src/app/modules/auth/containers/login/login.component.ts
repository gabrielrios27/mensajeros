import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  flag: boolean = false;
  flag2: boolean = false;
  errorMessage: any;
  flagSeePassword: boolean = false;
  constructor(
    public serviceLogin: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }

  ngOnInit() {
    localStorage.removeItem('isAdmin');
  }
  changeType() {
    let element: any = document.getElementById('password');
    if (element.type === 'text') {
      this.flagSeePassword = false;
      element.type = 'password';
    } else {
      this.flagSeePassword = true;
      element.type = 'text';
    }
  }
  setLocalStorage(data: any) {
    if (data) {
      localStorage.setItem('Usuario', JSON.stringify(data));
    }
  }

  getRole() {
    this.serviceLogin.getRole().subscribe({
      next: (data: any) => {
        setTimeout(() => this.cdr.detectChanges());
        if (data.authority === 'ROLE_ADMIN') {
          this.router.navigate(['admin/dashboard/home']);
        } else {
          this.router.navigate(['user/dashboard/home']);
        }
      },
      error: (err) => {
        setTimeout(() => this.cdr.detectChanges());
      },
    });
  }

  onLogin(): any {
    const from = this.loginForm.value;
    this.serviceLogin.loginByEmail(from).subscribe(
      (data) => {
        if (data) {
          setTimeout(() => this.cdr.detectChanges());

          this.setLocalStorage(data.token);
          this.getRole();
        }
      },
      (error) => {
        if (error === 401) {
          this.errorMessage = error.status;
          setTimeout(() => this.cdr.detectChanges());
          this.flag = true;
        } else {
          this.errorMessage = error;
          setTimeout(() => this.cdr.detectChanges());
          this.flag2 = true;
        }
      }
    );
  }
}
