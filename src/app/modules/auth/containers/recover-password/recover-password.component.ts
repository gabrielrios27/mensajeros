import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { changePassword } from '../../models/changePassword';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent implements OnInit {
  flag: boolean = false;
  formg!: FormGroup;
  token: any 

  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService, private cdr: ChangeDetectorRef, private routeActive: ActivatedRoute) {
    this.formg = this.fb.group(
      {
        password: ['', Validators.minLength(8)],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.mustMatch('password', 'confirmPassword'),
      }
    );
  }

  ngOnInit(): void {
    this.getTokenFromRute()
    localStorage.removeItem('isAdmin');
    
  }

  getTokenFromRute() {
    let token;
    this.routeActive.paramMap.subscribe((params: ParamMap) => {
      token = params.get('token');
    });
    this.token =  token;
  }

  confirm(form: changePassword) {
    form.tokenPassword = this.token
    this.auth.changePassword(form).subscribe({
      next: (res) => {
        setTimeout(() => this.cdr.detectChanges());
        this.router.navigate(['auth/login']);
      },
      error: (err) => {
      },
    });
    
  }

  get f() {
    return this.formg.controls;
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}