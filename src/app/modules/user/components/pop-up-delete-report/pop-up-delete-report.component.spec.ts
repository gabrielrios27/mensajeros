import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpDeleteReportComponent } from './pop-up-delete-report.component';

describe('PopUpDeleteReportComponent', () => {
  let component: PopUpDeleteReportComponent;
  let fixture: ComponentFixture<PopUpDeleteReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpDeleteReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpDeleteReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
