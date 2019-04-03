import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrnBorrowInComponent } from './trn-borrow-in.component';

describe('TrnBorrowInComponent', () => {
  let component: TrnBorrowInComponent;
  let fixture: ComponentFixture<TrnBorrowInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrnBorrowInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrnBorrowInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
