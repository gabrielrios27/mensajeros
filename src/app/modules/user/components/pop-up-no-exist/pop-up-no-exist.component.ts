import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-up-no-exist',
  templateUrl: './pop-up-no-exist.component.html',
  styleUrls: ['./pop-up-no-exist.component.scss'],
})
export class PopUpNoExistComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  onClickGoOut() {
    this.router.navigate(['user/dashboard/home']);
  }
}
