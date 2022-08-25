import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpNoExistComponent } from './pop-up-no-exist.component';

describe('PopUpNoExistComponent', () => {
  let component: PopUpNoExistComponent;
  let fixture: ComponentFixture<PopUpNoExistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpNoExistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpNoExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
