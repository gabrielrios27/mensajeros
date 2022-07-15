import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-am-user',
  templateUrl: './am-user.component.html',
  styleUrls: ['./am-user.component.scss']
})
export class AmUserComponent implements OnInit {
  

  constructor(private router: Router, private data:DataService) { }

  
  ngOnInit(): void {
  }

  confirm(){
    this.router.navigate(['admin/dashboard/usuarios']);
    this.data.flag = true
    this.data.nombreUsuario = "pepe"
  }

}
