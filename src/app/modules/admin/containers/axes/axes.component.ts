import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-axes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './axes.component.html',
  styleUrls: ['axes.component.scss'],
})
export class AxesComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
