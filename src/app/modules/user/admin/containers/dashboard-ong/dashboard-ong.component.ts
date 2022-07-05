import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-ong',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard-ong.component.html',
  styleUrls: ['dashboard-ong.component.scss'],
})
export class DashboardOngComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
