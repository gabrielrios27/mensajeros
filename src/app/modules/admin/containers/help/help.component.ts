import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './help.component.html',
  styleUrls: ['help.component.scss'],
})
export class HelpComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
