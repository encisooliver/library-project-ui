import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrnBorrowOutComponent } from './trn-borrow-out.component';

describe('TrnBorrowOutComponent', () => {
  let component: TrnBorrowOutComponent;
  let fixture: ComponentFixture<TrnBorrowOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrnBorrowOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrnBorrowOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
