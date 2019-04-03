import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrnReserveComponent } from './trn-reserve.component';

describe('TrnReserveComponent', () => {
  let component: TrnReserveComponent;
  let fixture: ComponentFixture<TrnReserveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrnReserveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrnReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
