import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutsService } from 'src/app/core/layouts/services';

@Component({
  selector: 'app-upload-reports',
  templateUrl: './upload-reports.component.html',
  styleUrls: ['./upload-reports.component.scss'],
})
export class UploadReportsComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit(): void {}
  onCloseSave() {}
  ngOnDestroy() {}
}
