import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendingReportComponent } from './sending-report.component';

describe('SendingReportComponent', () => {
  let component: SendingReportComponent;
  let fixture: ComponentFixture<SendingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendingReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
