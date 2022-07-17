import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-axes',
  templateUrl: './add-axes.component.html',
  styleUrls: ['./add-axes.component.scss'],
})
export class AddAxesComponent implements OnInit {
  newAxe: FormGroup = this.fb.group({
    axe: [, [Validators.required]],
    centers: [],
  });

  centerList: string[] = [
    'Hogar Colibríes',
    'San Jose',
    'Club de Día',
    'Centro la Balsa',
    'Centro la Balsa',
    'Centro la Balsa',
  ];
  invalidForm: boolean = false;
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {}
  onConfirm() {
    if (this.newAxe.invalid) {
      this.invalidForm = true;
      return;
    } else {
      this.invalidForm = true;
      console.log(this.newAxe);
      this.setAxeLocStg(true);
      this.router.navigate(['admin/dashboard/ejes']);
    }
  }
  onChangeInput(e: string) {
    if (e.length !== 0) {
      this.invalidForm = false;
    }
  }
  setAxeLocStg(data: boolean) {
    localStorage.setItem('isNewAxe', JSON.stringify(data));
  }
}
