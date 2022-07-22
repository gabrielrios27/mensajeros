import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup
    flag: boolean = false
    errorMessage: any;

    constructor(public serviceLogin: AuthService, private fb: FormBuilder, private router: Router,) {
        this.loginForm = this.fb.group({
            email: ['', Validators.required],
            contrasena: ['', Validators.required]
        })
    }


    ngOnInit() {

    }

    setLocalStorage(data: any) {
        if (data) {
            localStorage.setItem('Usuario', JSON.stringify(data))
        }
    }

    onLogin(): any {
        const from = this.loginForm.value
        this.serviceLogin.loginByEmail(from).subscribe(
            (data) => {
                if (data) {
                    console.log(data)
                    this.setLocalStorage(data.token)
                    this.router.navigate(['admin/dashboard/home'])
                }
            },
            (error) => {
                console.error("error", error.status)
                if (error.status == 401) {
                    this.errorMessage = error.status
                }
            }
        )
        this.flag = true
    }

}
