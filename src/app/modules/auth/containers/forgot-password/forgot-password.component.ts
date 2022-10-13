import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../../services';
import { Mail } from '../../models/mail';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  flag: boolean = false;
  email: any

  emailFormControl: FormGroup;
  matcher = new MyErrorStateMatcher();
  constructor(private auth:AuthService, private cdr:ChangeDetectorRef, private fb: FormBuilder) {
    this.emailFormControl = fb.group({
      mailTo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    localStorage.removeItem('isAdmin');
  }

  submit(email: any) {
    const img = document.getElementById('img');
    this.flag = true;
    img?.style.setProperty('margin-top', '267px');
    this.auth.sendEmail(email).subscribe({
      next: (res) => {
        setTimeout(() => this.cdr.detectChanges());
      },
      error: (err) => {
      },
    });
  }
}
