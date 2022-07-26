import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    flag2: boolean = false
    errorMessage: any;

    constructor(public serviceLogin: AuthService, private fb: FormBuilder, private router: Router, private cdr : ChangeDetectorRef) {
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
                    setTimeout(() => this.cdr.detectChanges())
                    console.log(data)
                    this.setLocalStorage(data.token)
                    this.router.navigate(['admin/dashboard/home'])
                    
                }
            },
            (error) => {
                console.error("error", error.status)
                if (error.status == 401) {
                    this.errorMessage = error.status
                    setTimeout(() => this.cdr.detectChanges())
                    this.flag = true
                }
                else{
                    this.errorMessage = error
                    setTimeout(() => this.cdr.detectChanges())
                    this.flag2 = true
                }
                
            }
        )
    }

}
