import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-am-user',
  templateUrl: './am-user.component.html',
  styleUrls: ['./am-user.component.scss']
})
export class AmUserComponent implements OnInit {
  
  formUpEdit: FormGroup;

  constructor(private router: Router, private data:DataService, private fb:FormBuilder) {
    this.formUpEdit = fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.compose([Validators.required,Validators.email])],
      password: ['', Validators.required]
    })
  }

  
  ngOnInit(): void {
  }

  confirm(){
    this.router.navigate(['admin/dashboard/usuarios']);
    this.data.flag = true
    this.data.nombreUsuario = "pepe"
  }

}
