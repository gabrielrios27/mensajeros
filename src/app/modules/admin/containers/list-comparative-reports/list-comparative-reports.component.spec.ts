import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComparativeReportsComponent } from './list-comparative-reports.component';

describe('ListComparativeReportsComponent', () => {
  let component: ListComparativeReportsComponent;
  let fixture: ComponentFixture<ListComparativeReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComparativeReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComparativeReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
