import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterOfReportComponent } from './center-of-report.component';

describe('CenterOfReportComponent', () => {
  let component: CenterOfReportComponent;
  let fixture: ComponentFixture<CenterOfReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterOfReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterOfReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
