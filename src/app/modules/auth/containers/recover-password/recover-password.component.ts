import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent implements OnInit {
  flag: boolean = false;
  formg!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.formg = this.fb.group(
      {
        password: ['', Validators.minLength(8)],
        cPassword: ['', Validators.required],
      },
      {
        validators: this.mustMatch('password', 'cPassword'),
      }
    );
  }

  ngOnInit(): void {
    localStorage.removeItem('isAdmin');
    console.log(this.formg.controls.errors);
  }

  confirm() {
    this.router.navigate(['/dashboar']);
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
